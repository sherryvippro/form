import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import classNames from 'classnames/bind'
import styles from './Product.module.scss'
import Form from './Form'
import Table from './Table'

const cx = classNames.bind(styles)

function Product() {
    const [loading, setLoading] = useState(true)
    const [checkNewProductId, setCheckNewProductId] = useState(true)
    const [listProduct, setListProduct] = useState([])
    const [errors, setErrors] = useState({})
    const [dataToCreate, setDataToCreate] = useState({
        categories: [],
        suppliers: [],
    })
    const [formProduct, setFormProduct] = useState({
        maSp: '',
        tenSp: '',
        maTl: '',
        maHang: '',
        donGiaNhap: '',
        donGiaBan: '',
        soLuong: '',
        anh: '',
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const [res, resToCreate] = await Promise.all([
                axios.get('http://localhost:5123/products'),
                axios.get('http://localhost:5123/products/toCreate'),
            ])

            setListProduct(res.data.product)
            setDataToCreate({
                categories: resToCreate.data.categories,
                suppliers: resToCreate.data.suppliers,
            })
            setFormProduct((prevForm) => ({
                ...prevForm,
                maSp: resToCreate.data.productId,
            }))
            setCheckNewProductId(false)
        } catch (error) {
            console.error('Failed to get list product', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkNewProductId && fetchData()
    }, [checkNewProductId])

    const validateForm = () => {
        const newErrors = {}
        if (formProduct.tenSp === '') {
            newErrors.tenSp = 'Tên sản phẩm không được  để trống'
        }
        if (formProduct.maTl === '') {
            newErrors.maTl = 'Danh mục không được để trống'
        }
        if (formProduct.maHang === '') {
            newErrors.maHang = 'Nhà cung cấp không được để trống'
        }
        if (formProduct.donGiaNhap === '') {
            newErrors.donGiaNhap = 'Giá nhập không được để trống'
        }
        if (formProduct.donGiaBan === '') {
            newErrors.donGiaBan = 'Giá bán không được để trống'
        }
        if (formProduct.soLuong === '') {
            newErrors.soLuong = 'Số lượng không được để trống'
        }
        return newErrors
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormProduct((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formErrors = validateForm()

        try {
            if (Object.keys(formErrors).length === 0) {
                await axios.post('http://localhost:5123/products', formProduct)
                setListProduct((prevProduct) => [...prevProduct, formProduct])
                setFormProduct({
                    maSp: '',
                    tenSp: '',
                    maTl: '',
                    maHang: '',
                    donGiaNhap: '',
                    donGiaBan: '',
                    soLuong: '',
                    anh: '',
                })
                setCheckNewProductId(true)
                setErrors({})
                console.log('formProduct: ', formProduct)
                console.log('listProduct: ', listProduct)
            } else {
                setErrors(formErrors)
            }
        } catch (error) {
            console.error('Failed to create product', error)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className={cx('wrapper')}>
            <Link to="/invoice" className={cx('link')}>
                Xem hóa đơn
            </Link>
            <div className={cx('wrapper-form')}>
                <Form
                    form={formProduct}
                    errors={errors}
                    dataToCreate={dataToCreate}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div className={cx('wrapper-table')}>
                <Table data={listProduct} />
            </div>
        </div>
    )
}

export default Product
