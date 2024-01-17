import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import  { getOrder,editOrder, } from "../../services/orderService";
import { useNavigate } from "react-router";

export default function ManegeOrder() {
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
            dispatch(getOrder(0))
        }
    }, [user,dispatch]);

    return (
        <>
            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Danh sách đơn hàng</h2>
                            </div>
                        </div>
                    </div>

            {orders.length === 0 && <><p style={{textAlignLast:"center", fontSize:100, height:300, marginTop:200}}>No order </p></>}
            <div className="row">
                <div className="col-12" >
                    <table className="table table-striped" border={1} style={{textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>ID đơn hàng</th>
                                <th>ID người mua</th>
                                <th>Người nhận</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng giá</th>
                                <th>Thời gian</th>
                                <th colSpan="2" style={{textAlign:"center"}}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders !== 'Can not find by id order' && orders.map((order) => (
                            <tr key={order.orderId} style={{marginBottom: 16}}>
                                <td>{order.orderId}</td>
                                <td>{order.userId}</td>
                                <td>{order.receiver}</td>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{order.totalAmount}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-outline-secondary" onClick={() => { dispatch(editOrder(order.orderId))}}>{order.status}</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-primary" onClick={() => { navigate(`/order-detail/${order.orderId}`)} }>Chi tiết</button>
                                </td>    
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}