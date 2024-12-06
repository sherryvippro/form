import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

import classNames from 'classnames/bind'
import styles from './Invoice.module.scss'
import Form from './Form'
import Table from './Table'

Modal.setAppElement('#root')

const cx = classNames.bind(styles)

function Invoice() {
    const [isOpen, setIsOpen] = useState(false)

    const [listInvoice, setListInvoice] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [checkNewInvoicetId, setCheckNewInvoicetId] = useState(true)
    const [dataToCreate, setdataToCreate] = useState({
        invoiceId: '',
        datetime: '',
        customers: [],
        products: [],
    })
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const [invoiceErrors, setInvoiceErrors] = useState({})
    const [invoice, setInvoice] = useState({
        soHdb: '',
        maNguoiDung: '',
        hoten: '',
        ngayBan: '',
        tongHdb: '',
        tChiTietHdbs: '',
    })
    const [invoiceDetail, setInvoiceDetail] = useState({
        soHdb: invoice.soHdb,
        maSp: '',
        tenSp: '',
        donGiaBan: '',
        slban: '',
        khuyenMai: '',
        thanhTien: '',
    })
    const [submittedInfo, setSubmittedInfo] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const fetchData = async () => {
        try {
            setLoading(true)
            const [res, resToCreate] = await Promise.all([
                axios.get('http://localhost:5123/invoices'),
                axios.get('http://localhost:5123/invoices/toCreate'),
            ])
            setListInvoice(res.data)
            setdataToCreate({
                invoiceId: resToCreate.data.invoiceId,
                datetime: resToCreate.data.datetime,
                customers: resToCreate.data.customers,
                products: resToCreate.data.products,
            })
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                soHdb: resToCreate.data.invoiceId,
                ngayBan: resToCreate.data.datetime,
            }))
            setCheckNewInvoicetId(false)
        } catch (error) {
            console.error('Failed to get list invoice', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkNewInvoicetId && fetchData()
    }, [checkNewInvoicetId])

    const validateFormProduct = () => {
        const newErrors = {}
        if (invoiceDetail.maSp === '') {
            newErrors.maSp = 'Vui lòng chọn sản phẩm'
        }
        if (invoiceDetail.slban === '') {
            newErrors.slban = 'Vui lòng nhập số lượng'
        }
        if (invoiceDetail.khuyenMai === '') {
            newErrors.khuyenMai = 'Vui lòng nhập mức giảm giá'
        }
        return newErrors
    }

    const validateFormInvocie = () => {
        const newErrors = {}
        if (invoice.maNguoiDung === '') {
            newErrors.maNguoiDung = 'Vui lòng chọn khách hàng'
        }
        return newErrors
    }

    const handleChange = async (event) => {
        const { name, value } = event.target
        setInvoiceDetail((prevForm) => ({
            ...prevForm,
            [name]: value,
            soHdb: invoice.soHdb,
        }))
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            [name]: value,
        }))
        setErrors({})
    }

    const handleChangeProductId = async (event) => {
        const productId = event.target.value
        setInvoiceDetail((prevForm) => ({
            ...prevForm,
            maSp: productId,
        }))

        const product = dataToCreate.products.find((p) => p.maSp === productId)
        if (product) {
            setInvoiceDetail((prevForm) => ({
                ...prevForm,
                tenSp: product.tenSp,
                donGiaBan: product.donGiaBan,
            }))
        } else {
            setInvoiceDetail((prevForm) => ({
                ...prevForm,
                donGiaBan: 0,
            }))
        }
    }

    const handleChangeCustomerId = async (event) => {
        const customerId = event.target.value
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            maNguoiDung: customerId,
        }))
        const customer = dataToCreate.customers.find((c) => c.maNguoiDung === parseInt(customerId))
        if (customer) {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                hoten: customer.hoten,
            }))
        } else {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                hoten: '',
            }))
        }
    }

    const handleOnClick = (event) => {
        event.preventDefault()
        const formErrors = validateFormProduct()
        if (Object.keys(formErrors).length === 0) {
            setListProduct((prevList) => [...prevList, invoiceDetail])
            setTotalPrice((prevTotal) => prevTotal + invoiceDetail.thanhTien)
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                tongHdb: totalPrice,
            }))
            setErrors({})
        } else setErrors(formErrors)
    }

    const handleOnDelete = (maSp) => {
        setListProduct((prevList) => prevList.filter((product) => product.maSp !== maSp))
    }

    const closeModal = () => {
        setIsOpen(false)
        setSubmittedInfo([])
    }

    const handleSubmit = async (event) => {
        console.log('submitted')
        event.preventDefault()
        const formInvoiceErrors = validateFormInvocie()
        const formProductErrors = validateFormProduct()
        const formInvoice = {
            soHdb: invoice.soHdb,
            ngayBan: invoice.ngayBan,
            maNguoiDung: invoice.maNguoiDung,
            hoten: invoice.hoten,
            tongHdb: invoice.tongHdb,
            tChiTietHdbs: listProduct,
        }

        try {
            if (
                Object.keys(formInvoiceErrors).length === 0 &&
                Object.keys(formProductErrors).length === 0 &&
                listProduct.length > 0
            ) {
                axios.post('http://localhost:5123/invoices', formInvoice)
                setSubmittedInfo((prevInfo) => [...prevInfo, formInvoice])
                setIsOpen(true)
                setCheckNewInvoicetId(true)
                setListInvoice((prevInvoice) => [...prevInvoice, formInvoice])
                setInvoice({
                    soHdb: '',
                    maNguoiDung: '',
                    ngayBan: '',
                    tongHdb: '',
                    tChiTietHdbs: '',
                })
                setInvoiceDetail({
                    maSp: '',
                    tenSp: '',
                    donGiaBan: '',
                    slban: '',
                    khuyenMai: '',
                })
                setListProduct([])
                setErrors({})
                setInvoiceErrors({})
            } else {
                setErrors(formProductErrors)
                setInvoiceErrors(formInvoiceErrors)
            }
        } catch (error) {
            console.log('Failed to create invoice', error)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className={cx('wrapper')}>
            <Link to="/product" className={cx('link')}>
                Quay lại
            </Link>
            <div className={cx('wrapper-form')}>
                <Form
                    listProduct={listProduct}
                    invoice={invoice}
                    invoiceDetail={invoiceDetail}
                    errors={errors}
                    invoiceErrors={invoiceErrors}
                    dataToCreate={dataToCreate}
                    handleChange={handleChange}
                    handleChangeProductId={handleChangeProductId}
                    handleChangeCustomerId={handleChangeCustomerId}
                    handleOnClick={handleOnClick}
                    handleOnDelete={handleOnDelete}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className={cx('wrapper-table')}>
                <Table data={listInvoice} title />
            </div>
            <Modal
                className={cx('modal')}
                overlayClassName={cx('overlay')}
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Submitted Invoice"
            >
                <div className={cx('modal-body')}>
                    <Table data={submittedInfo} title="Tạo hóa đơn thành công!" />
                </div>
                <button className={cx('close-modal')} onClick={closeModal}>
                    Close
                </button>
            </Modal>
        </div>
    )
}

export default Invoice
