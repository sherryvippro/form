import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function Table({ data, title }) {
    return (
        <div className={cx('wrapper')}>
            <h4>{title && title === 'Tạo hóa đơn thành công!' ? title : 'Danh sách hóa đơn'}</h4>
            {data.map((invoice, index) => (
                <div className={cx('list-invoice')}>
                    <h4>Hóa đơn số {invoice.soHdb}</h4>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Khách hàng</th>
                                <th>Ngày bán</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={invoice.soHdb + index}>
                                <td>{invoice.soHdb}</td>
                                <td>{invoice.hoTen}</td>
                                <td>{invoice.ngayBan}</td>
                                <td>{invoice.tongHdb}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Chi tiết hóa đơn {invoice.soHdb}</h4>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Khuyến mãi (%) </th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.tChiTietHdbs.map((item) => (
                                <tr key={invoice.soHdb + item.maSp}>
                                    <td>{item.soHdb}</td>
                                    <td className={cx('product-name')}>{item.tenSp}</td>
                                    <td>{item.slban}</td>
                                    <td>{item.khuyenMai}</td>
                                    <td>{item.thanhTien}</td>
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
