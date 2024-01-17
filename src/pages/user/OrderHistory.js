import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import   { getOrder } from "../../services/orderService";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"; 

export default function OrderHistory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(state => {
        return state.orders.orders
    });
    const user = useSelector(state =>{
        return state.user.currentUser
    });

    useEffect(() => {
        if(user.userId){
            dispatch(getOrder(user.userId))
        }
    }, [user,dispatch]);

    return (
        <>
        <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Trang chủ<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="">Lịch sử mua hàng</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 section-title">
                <h2>Lịch sử mua</h2>
            </div>

            {orders.length === 0 && <><p style={{textAlignLast:"center", fontSize:100, height:300, marginTop:200}}>Bạn chưa mua hàng</p></>}
            <div className="row">
                <div className="col-12" >
                    <table className="table table-striped" border={1} style={{textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>ID đơn hàng</th>
                                <th>Người nhận</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng giá</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders !== 'Can not find by id order' && orders.map((order) => (
                            <tr key={order.orderId} style={{marginBottom: 16}}>
                                <td>{order.orderId}</td>
                                <td>{order.receiver}</td>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{order.totalAmount}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button className="btn btn-outline-secondary" onClick={() => navigate(`/order-detail/${order.orderId}`)}>Chi tiết</button>
                                </td>    
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}