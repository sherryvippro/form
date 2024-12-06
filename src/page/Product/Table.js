import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)
function Table({ data }) {
    return (
        <div className={cx('wrapper')}>
            <h4>Danh sách sản phẩm</h4>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Nhà cung cấp</th>
                        <th>Giá nhập</th>
                        <th>Giá bán</th>
                        <th>Số lượng</th>
                        <th>Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.maSp}>
                            <td>{product.maSp}</td>
                            <td className={cx('product-name')}>{product.tenSp}</td>
                            <td>{product.tenTl}</td>
                            <td>{product.tenHang}</td>
                            <td>{product.donGiaNhap}</td>
                            <td>{product.donGiaBan}</td>
                            <td>{product.soLuong}</td>
                            <td>{product.anh}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
