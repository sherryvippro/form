import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Invoice.module.scss'
import Form from './Form'
import Table from './Table'

const cx = classNames.bind(styles)

function Invoice() {
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
    const [invoice, setInvoice] = useState({
        soHdb: '',
        maNguoiDung: '',
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
    })

    const [formInvoice, setFormInvoice] = useState({})

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

    const validateForm = () => {
        const newErrors = {}
        if (invoice.hoten === '') {
            newErrors.hoten = 'Vui lòng chọn khách hàng'
        }
        if (invoiceDetail.tenSp === '') {
            newErrors.maSp = 'Vui lòng chọn sản phẩm'
        }
        if (invoiceDetail.slban === '') {
            newErrors.slban = 'Vui lòng nhập số lượng'
        }
        if (invoiceDetail.donGiaBan === '') {
            newErrors.donGiaBan = 'Vui lòng nhập giá bán'
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
    }

    const handleOnClick = () => {
        setListProduct((prevList) => [...prevList, invoiceDetail])
    }

    const handleOnDelete = (maSp) => {
        setListProduct((prevList) => prevList.filter((product) => product.maSp !== maSp))
    }

    const handleSubmit = async (event) => {
        console.log('submit')
        event.preventDefault()
        setFormInvoice((prevForm) => ({
            ...prevForm,
            soHdb: invoice.soHdb,
            ngayBan: invoice.ngayBan,
            maNguoiDung: invoice.maNguoiDung,
            tongHdb: invoice.tongHdb,
            tChiTietHdbs: listProduct,
        }))
        console.log('invoice detail: ', invoiceDetail)
        console.log('list product: ', listProduct)

        try {
            axios.post('http://localhost:5123/invoices', formInvoice)
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
        } catch (error) {
            console.log('Failed to create invoice', error)
        }
    }

    useEffect(() => {
        console.log('formInvoice updated:', formInvoice)
    }, [formInvoice])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-form')}>
                <Form
                    listProduct={listProduct}
                    invoice={invoice}
                    invoiceDetail={invoiceDetail}
                    errors={errors}
                    dataToCreate={dataToCreate}
                    handleChange={handleChange}
                    handleOnClick={handleOnClick}
                    handleOnDelete={handleOnDelete}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className={cx('wrapper-table')}>
                <Table data={listInvoice} />
            </div>
            <Link to="/product">Quay lại</Link>
        </div>
    )
}

export default Invoice
