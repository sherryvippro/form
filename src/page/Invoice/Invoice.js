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
    const [checkNewProductId, setCheckNewProductId] = useState(true)
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
    })
    const [invoiceDetail, setInvoiceDetail] = useState({
        soHdb: '',
        maSp: '',
        slban: '',
        khuyenMai: '',
    })

    const handleSubmit = async (event) => {
        console.log('submit')
    }
    const handleChange = async (event) => {
        const { name, value } = event.target
    }

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
            setInvoiceDetail(resToCreate.data.invoiceId)
            setCheckNewProductId(false)
        } catch (error) {
            console.error('Failed to get list invoice', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkNewProductId && fetchData()
    }, [checkNewProductId])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-form')}>
                <Form dataToCreate={dataToCreate} invoice={invoice} />
            </div>
            <div className={cx('wrapper-table')}>
                <Table data={listInvoice} />
            </div>
            <Link to="/product">Quay lại</Link>
        </div>
    )
}

export default Invoice
