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
        invoiceId: '',
        userId: '',
        fullName: '',
        saleDate: '',
        totalPrice: '',
        invoiceDetails: '',
    })
    const [invoiceDetail, setInvoiceDetail] = useState({
        invoiceId: invoice.invoiceId,
        productId: '',
        productName: '',
        salePrice: '',
        saleQuantity: '',
        discount: '',
        price: '',
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
                invoiceId: resToCreate.data.invoiceId,
                saleDate: resToCreate.data.datetime,
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

    useEffect(() => {
        const totalPrice = listProduct.reduce((total, product) => total + product.price, 0)
        setTotalPrice(totalPrice)
    }, [listProduct])

    const validateFormProduct = () => {
        const newErrors = {}
        if (invoiceDetail.productId === '') {
            newErrors.productId = 'Vui lòng chọn sản phẩm'
        }
        if (invoiceDetail.saleQuantity === '') {
            newErrors.saleQuantity = 'Vui lòng nhập số lượng'
        }
        if (invoiceDetail.discount === '') {
            newErrors.discount = 'Vui lòng nhập mức giảm giá'
        }
        return newErrors
    }

    const validateFormInvocie = () => {
        const newErrors = {}
        if (invoice.userId === '') {
            newErrors.userId = 'Vui lòng chọn khách hàng'
        }
        return newErrors
    }

    const handleChange = async (event) => {
        const { name, value } = event.target
        setInvoiceDetail((prevForm) => ({
            ...prevForm,
            [name]: value,
            invoiceId: invoice.invoiceId,
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
            productId: productId,
        }))

        const product = dataToCreate.products.find((p) => p.productId === productId)
        if (product) {
            setInvoiceDetail((prevForm) => ({
                ...prevForm,
                productName: product.productName,
                salePrice: product.salePrice,
            }))
        } else {
            setInvoiceDetail((prevForm) => ({
                ...prevForm,
                salePrice: 0,
            }))
        }
        setErrors({})
    }

    const handleChangeCustomerId = async (event) => {
        const customerId = event.target.value
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            userId: customerId,
        }))
        const customer = dataToCreate.customers.find((c) => c.userId === parseInt(customerId))
        if (customer) {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                fullName: customer.fullName,
            }))
        } else {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                fullName: '',
            }))
        }
        setInvoiceErrors({})
    }

    const handleOnClick = (event) => {
        event.preventDefault()
        const formErrors = validateFormProduct()

        if (Object.keys(formErrors).length === 0) {
            if (
                listProduct.filter((product) => product.productId === invoiceDetail.productId)
                    .length !== 0
            ) {
                alert('Sản phẩm đã được thêm vào hóa đơn!')
            } else {
                invoiceDetail.price =
                    (invoiceDetail.salePrice *
                        invoiceDetail.saleQuantity *
                        (100 - invoiceDetail.discount)) /
                    100
                setListProduct((prevList) => [...prevList, invoiceDetail])
            }
            setErrors({})
        } else setErrors(formErrors)
    }

    const handleOnDelete = (productId) => {
        setListProduct((prevList) => prevList.filter((product) => product.productId !== productId))
    }

    const closeModal = () => {
        setIsOpen(false)
        setSubmittedInfo([])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formInvoiceErrors = validateFormInvocie()
        const formProductErrors = validateFormProduct()
        const formInvoice = {
            invoiceId: invoice.invoiceId,
            saleDate: invoice.saleDate,
            userId: invoice.userId,
            fullName: invoice.fullName,
            totalPrice: totalPrice,
            invoiceDetails: listProduct,
        }

        try {
            if (listProduct.length === 0) {
                alert('Vui lòng thêm sản phẩm vào hóa đơn!')
            } else if (
                Object.keys(formInvoiceErrors).length === 0 &&
                Object.keys(formProductErrors).length === 0 &&
                listProduct.length > 0
            ) {
                await axios.post('http://localhost:5123/invoices', formInvoice)
                setSubmittedInfo((prevInfo) => [...prevInfo, formInvoice])
                setIsOpen(true)
                setCheckNewInvoicetId(true)
                setListInvoice((prevInvoice) => [...prevInvoice, formInvoice])
                setInvoice({
                    invoiceId: '',
                    userId: '',
                    saleDate: '',
                    totalPrice: '',
                    invoiceDetails: '',
                })
                setInvoiceDetail({
                    productId: '',
                    productName: '',
                    salePrice: '',
                    saleQuantity: '',
                    discount: '',
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
                    totalPrice={totalPrice}
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
