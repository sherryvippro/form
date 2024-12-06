import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function Table({ data, title }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>
                {title && title === 'Tạo hóa đơn thành công!' ? title : 'Danh sách hóa đơn'}
            </h4>
            {data.map((invoice, index) => (
                <div className={cx('list-invoice')}>
                    <h4>Hóa đơn số {invoice.invoiceId}</h4>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Khách hàng</th>
                                <th>Ngày bán</th>
                                <th>Tổng tiền (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={invoice.invoiceId + index}>
                                <td>{invoice.invoiceId}</td>
                                <td>{invoice.fullName}</td>
                                <td>{invoice.saleDate}</td>
                                <td>{invoice.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Chi tiết hóa đơn {invoice.invoiceId}</h4>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Khuyến mãi (%) </th>
                                <th>Thành tiền (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.invoiceDetails.map((item) => (
                                <tr key={invoice.invoiceId + item.productId}>
                                    <td>{item.invoiceId}</td>
                                    <td className={cx('product-name')}>{item.productName}</td>
                                    <td>{item.saleQuantity}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default Table
