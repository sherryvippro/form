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
                        <th>Hãng sản xuất</th>
                        <th>Giá nhập (VND)</th>
                        <th>Giá bán (VND)</th>
                        <th>Số lượng</th>
                        <th>Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td className={cx('product-name')}>{product.productName}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.manufacturerName}</td>
                            <td>{product.inPrice}</td>
                            <td>{product.salePrice}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <img
                                    src={`assets/images/${product.image}`}
                                    alt={product.productName}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
