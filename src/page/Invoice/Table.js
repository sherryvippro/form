import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function Table({ data }) {
    return (
        <div className={cx('wrapper')}>
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
                    {data.map((invoice, index) => (
                        <tr key={invoice.soHdb + index}>
                            <td>{invoice.soHdb}</td>
                            <td>{invoice.maNguoiDung}</td>
                            <td>{invoice.ngayBan}</td>
                            <td>{invoice.tongHdb}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Mã hóa đơn</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Khuyến mại</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((invoice, index) => (
                        <tr key={index}>
                            <td>{invoice.tChiTietHdbs.soHdb}</td>
                            <td>{invoice.tChiTietHdbs.maSp}</td>
                            <td>{invoice.tChiTietHdbs.slban}</td>
                            <td>{invoice.tChiTietHdbs.khuyenMai}</td>
                            <td>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
