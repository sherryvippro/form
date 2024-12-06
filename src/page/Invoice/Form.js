import classNames from 'classnames/bind'

import styles from './Form.module.scss'

const cx = classNames.bind(styles)

function Form({
    listProduct,
    invoice,
    invoiceDetail,
    totalPrice,
    errors,
    invoiceErrors,
    dataToCreate,
    handleSubmit,
    handleChange,
    handleChangeProductId,
    handleChangeCustomerId,
    handleOnClick,
    handleOnDelete,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('invoice')}>
                <div className={cx('row')}>
                    <label className={cx('text')}>Mã hóa đơn</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="invoiceId"
                        readOnly
                        value={dataToCreate.invoiceId}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Ngày lập</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="saleDate"
                        readOnly
                        value={dataToCreate.datetime}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tên khách hàng</label>
                    <select
                        className={cx('value')}
                        name="userId"
                        value={invoice.userId}
                        onChange={handleChangeCustomerId}
                    >
                        <option value="">Chọn khách hàng</option>
                        {dataToCreate.customers.map((customer) => (
                            <option key={customer.userId} value={customer.userId}>
                                {customer.fullName}
                            </option>
                        ))}
                    </select>
                    {invoiceErrors.userId && <p style={{ color: 'red' }}>{invoiceErrors.userId}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tổng tiền (VND)</label>
                    <input
                        className={cx('value')}
                        type="number"
                        name="totalPrice"
                        readOnly
                        value={totalPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className={cx('button')}>
                    <button onClick={handleSubmit} type="submit">
                        Thêm
                    </button>
                </div>
            </div>
            <div className={cx('product-form')}>
                <div className={cx('product-add')}>
                    <div className={cx('row')}>
                        <label className={cx('text')}>Sản phẩm</label>
                        <select
                            className={cx('value')}
                            name="productId"
                            value={invoiceDetail.productId}
                            onChange={handleChangeProductId}
                        >
                            <option value="">Chọn sản phẩm</option>
                            {dataToCreate.products.map((product) => (
                                <option key={product.productId} value={product.productId}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                        {errors.productId && <p style={{ color: 'red' }}>{errors.productId}</p>}
                    </div>
                    <div className={cx('row')}>
                        <label className={cx('text')}>Số lượng</label>
                        <input
                            className={cx('value')}
                            type="number"
                            name="saleQuantity"
                            value={invoiceDetail.saleQuantity}
                            onChange={handleChange}
                            min="1"
                            onKeyDown={(e) => {
                                if (e.key === '-') e.preventDefault()
                            }}
                        />
                        {errors.saleQuantity && (
                            <p style={{ color: 'red' }}>{errors.saleQuantity}</p>
                        )}
                    </div>
                    <div className={cx('row')}>
                        <label className={cx('text')}>Đơn giá (VND)</label>
                        <input
                            className={cx('value')}
                            type="number"
                            value={invoiceDetail.salePrice}
                            name="salePrice"
                            readOnly
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('row')}>
                        <label className={cx('text')}>Khuyến mãi (%)</label>
                        <input
                            className={cx('value')}
                            type="number"
                            name="discount"
                            value={invoiceDetail.discount}
                            onChange={handleChange}
                            min="0"
                            onKeyDown={(e) => {
                                if (e.key === '-') e.preventDefault()
                            }}
                        />
                        {errors.discount && <p style={{ color: 'red' }}>{errors.discount}</p>}
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
                                <th>Khuyến mãi (%)</th>
                                <th>Thành tiền (VND)</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        {listProduct.map((product) => (
                            <tbody key={product.productId}>
                                <tr>
                                    <td>{product.productId}</td>
                                    <td className={cx('product-name')}>{product.productName}</td>
                                    <td>{product.salePrice}</td>
                                    <td>{product.saleQuantity}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button onClick={() => handleOnDelete(product.productId)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Form
