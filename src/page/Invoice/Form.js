import { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './Form.module.scss'
import Table from '../Product/Table'

const cx = classNames.bind(styles)

function Form({ invoice, dataToCreate, handleSubmit }) {
    const [formProduct, setFormProduct] = useState({
        maSp: '',
        tenSp: '',
        donGiaBan: '',
        soLuong: '',
        khuyenMai: '',
        thanhTien: '',
    })
    const listProduct = [
        {
            maSp: '',
            tenSp: '',
            donGiaBan: '',
            soLuong: '',
            khuyenMai: '',
            thanhTien: '',
        },
    ]

    const handleOnClick = () => {}

    const handleChangeProductInfo = () => {}

    const handleChangeInvocieInfo = () => {}

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-add')}>
                <div className={cx('row')}>
                    <label className={cx('text')}>Sản phẩm</label>
                    <select
                        className={cx('value')}
                        name="maSp"
                        value={formProduct.maSp}
                        onChange={handleChangeProductInfo}
                    >
                        <option value="">Chọn sản phẩm</option>
                        {dataToCreate.products.map((product) => (
                            <option key={product.maSp} value={product.maSp}>
                                {product.tenSp}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Số lượng</label>
                    <input
                        className={cx('value')}
                        type="number"
                        name="soLuong"
                        value={formProduct.soLuong}
                        onChange={handleChangeProductInfo}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Đơn giá</label>
                    <input
                        className={cx('value')}
                        type="number"
                        value={formProduct.donGiaBan}
                        name="donGiaBan"
                        onChange={handleChangeProductInfo}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Khuyến mãi</label>
                    <input
                        className={cx('value')}
                        type="number"
                        name="khuyenMai"
                        value={formProduct.khuyenMai}
                        onChange={handleChangeProductInfo}
                    />
                </div>
                <div className={cx('row')}>
                    <button className={cx('btn-add')} onClick={handleOnClick}>
                        Thêm
                    </button>
                </div>
            </div>

            <div className={cx('product-list')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Số lượng</th>
                            <th>Khuyến mãi</th>
                            <th>Thành tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    {listProduct.map((product) => (
                        <tbody key={product.maSp}>
                            <tr>
                                <td>{product.maSp}</td>
                                <td>{product.tenSp}</td>
                                <td>{product.donGiaBan}</td>
                                <td>{product.soLuong}</td>
                                <td>{product.khuyenMai}</td>
                                <td>{product.thanhTien}</td>
                                <td>
                                    <button>Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={cx('invoice')}>
                <div className={cx('row')}>
                    <label className={cx('text')}>Mã hóa đơn</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="soHdb"
                        readOnly
                        value={dataToCreate.invoiceId}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Ngày lập</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="ngayBan"
                        readOnly
                        value={dataToCreate.datetime}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tên khách hàng</label>
                    <select
                        className={cx('value')}
                        name="maNguoiDung"
                        value={invoice.maNguoiDung}
                        onChange={handleChangeInvocieInfo}
                    >
                        <option value="">Chọn khách hàng</option>
                        {dataToCreate.customers.map((customer) => (
                            <option key={customer.maNguoiDung} value={customer.maNguoiDung}>
                                {customer.hoten}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tổng tiền</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="tongHdb"
                        readOnly
                        value={invoice.tongHdb}
                        onChange={handleChangeInvocieInfo}
                    />
                </div>
                <div className={cx('button')}>
                    <button onClick={handleSubmit} type="submit">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Form
