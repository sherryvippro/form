import classNames from 'classnames/bind'
import styles from './Form.module.scss'

const cx = classNames.bind(styles)

function Form({ form, errors, dataToCreate, handleChange, handleSubmit }) {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('row')}>
                    <label className={cx('text')}>Mã sản phẩm</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="maSp"
                        readOnly
                        value={form.maSp || ''}
                    />
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Tên sản phẩm</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="tenSp"
                        required
                        value={form.tenSp}
                        onChange={handleChange}
                    />
                    {errors.tenSp && <p style={{ color: 'red' }}>{errors.tenSp}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Danh mục</label>
                    <select
                        className={cx('value')}
                        name="maTl"
                        required
                        value={form.maTl}
                        onChange={handleChange}
                    >
                        <option value="">Chọn danh mục</option>
                        {dataToCreate.categories.map((category) => (
                            <option key={category.maTl} value={category.maTl}>
                                {category.tenTl}
                            </option>
                        ))}
                    </select>
                    {errors.maTl && <p style={{ color: 'red' }}>{errors.maTl}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Nhà cung cấp</label>
                    <select
                        className={cx('value')}
                        name="maHang"
                        required
                        value={form.maHang}
                        onChange={handleChange}
                    >
                        <option value="">Chọn nhà cung cấp</option>
                        {dataToCreate.suppliers.map((supplier) => (
                            <option key={supplier.maHang} value={supplier.maHang}>
                                {supplier.tenHang}
                            </option>
                        ))}
                    </select>
                    {errors.maHang && <p style={{ color: 'red' }}>{errors.maHang}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Giá nhập</label>
                    <input
                        className={cx('value')}
                        name="donGiaNhap"
                        type="text"
                        required
                        value={form.donGiaNhap}
                        onChange={handleChange}
                    />
                    {errors.donGiaNhap && <p style={{ color: 'red' }}>{errors.donGiaNhap}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Giá bán</label>
                    <input
                        className={cx('value')}
                        type="text"
                        name="donGiaBan"
                        required
                        value={form.donGiaBan}
                        onChange={handleChange}
                    />
                    {errors.donGiaBan && <p style={{ color: 'red' }}>{errors.donGiaBan}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Số lượng</label>
                    <input
                        className={cx('value')}
                        type="number"
                        name="soLuong"
                        required
                        value={form.soLuong}
                        onChange={handleChange}
                    />
                    {errors.soLuong && <p style={{ color: 'red' }}>{errors.soLuong}</p>}
                </div>
                <div className={cx('row')}>
                    <label className={cx('text')}>Hình ảnh</label>
                    <input className={cx('value')} type="file" name="anh" />
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
