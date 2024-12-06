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
        productId: '',
        productName: '',
        categoryId: '',
        manufacturerId: '',
        inPrice: '',
        salePrice: '',
        quantity: '',
        image: '',
    })

    const fetchData = async () => {
        try {
            setLoading(true)
            const [res, resToCreate] = await Promise.all([
                axios.get('https://localhost:7015/products'),
                axios.get('https://localhost:7015/products/toCreate'),
            ])

            setListProduct(res.data.product)
            setDataToCreate({
                categories: resToCreate.data.categories,
                suppliers: resToCreate.data.suppliers,
            })
            setFormProduct((prevForm) => ({
                ...prevForm,
                productId: resToCreate.data.productId,
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
        if (formProduct.productName === '') {
            newErrors.productName = 'Tên sản phẩm không được  để trống'
        }
        if (formProduct.categoryId === '') {
            newErrors.categoryId = 'Danh mục không được để trống'
        }
        if (formProduct.manufacturerId === '') {
            newErrors.manufacturerId = 'Nhà cung cấp không được để trống'
        }
        if (formProduct.inPrice === '') {
            newErrors.inPrice = 'Giá nhập không được để trống'
        }
        if (formProduct.salePrice === '') {
            newErrors.salePrice = 'Giá bán không được để trống'
        }
        if (formProduct.quantity === '') {
            newErrors.quantity = 'Số lượng không được để trống'
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

    const handleChangeFile = (event) => {
        const fileName = event.target.files[0].name
        setFormProduct((prevForm) => ({
            ...prevForm,
            image: fileName,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formErrors = validateForm()
        console.log('file name: ', formProduct.image)

        try {
            if (Object.keys(formErrors).length === 0) {
                await axios.post('https://localhost:7015/products', formProduct)
                setListProduct((prevProduct) => [...prevProduct, formProduct])
                setFormProduct({
                    productId: '',
                    productName: '',
                    categoryId: '',
                    manufacturerId: '',
                    inPrice: '',
                    salePrice: '',
                    quantity: '',
                    image: '',
                })
                setCheckNewProductId(true)
                setErrors({})
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
                    handleChangeFile={handleChangeFile}
                />
            </div>
            <div className={cx('wrapper-table')}>
                <Table data={listProduct} />
            </div>
        </div>
    )
}

export default Product
