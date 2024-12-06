import classNames from 'classnames/bind'
import styles from './Form.module.scss'

const cx = classNames.bind(styles)

function Form({ form, errors, dataToCreate, handleChange, handleSubmit, handleChangeFile }) {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('row')}>
                    <label className={cx('text')}>Mã sản phẩm</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="productId"
                        readOnly
                        value={form.productId || ''}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tên sản phẩm</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="productName"
                        required
                        value={form.productName}
                        onChange={handleChange}
                    />
                    {errors.productName && <p style={{ color: 'red' }}>{errors.productName}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Danh mục</label>
                    <select
                        className={cx('value')}
                        name="categoryId"
                        required
                        value={form.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Chọn danh mục</option>
                        {dataToCreate.categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p style={{ color: 'red' }}>{errors.categoryId}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Nhà cung cấp</label>
                    <select
                        className={cx('value')}
                        name="manufacturerId"
                        required
                        value={form.manufacturerId}
                        onChange={handleChange}
                    >
                        <option value="">Chọn nhà cung cấp</option>
                        {dataToCreate.suppliers.map((supplier) => (
                            <option key={supplier.manufacturerId} value={supplier.manufacturerId}>
                                {supplier.manufacturerName}
                            </option>
                        ))}
                    </select>
                    {errors.manufacturerId && (
                        <p style={{ color: 'red' }}>{errors.manufacturerId}</p>
                    )}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Giá nhập (VND)</label>
                    <input
                        className={cx('value')}
                        name="inPrice"
                        type="text"
                        required
                        value={form.inPrice}
                        onChange={handleChange}
                    />
                    {errors.inPrice && <p style={{ color: 'red' }}>{errors.inPrice}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Giá bán (VND)</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="salePrice"
                        required
                        value={form.salePrice}
                        onChange={handleChange}
                    />
                    {errors.salePrice && <p style={{ color: 'red' }}>{errors.salePrice}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Số lượng</label>
                    <input
                        className={cx('value')}
                        type="number"
                        name="quantity"
                        required
                        value={form.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Hình ảnh</label>
                    <input
                        className={cx('value')}
                        type="file"
                        name="image"
                        onChange={handleChangeFile}
                    />
                </div>
                <div className={cx('button')}>
                    <button onClick={handleSubmit} type="submit">
                        Thêm
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
