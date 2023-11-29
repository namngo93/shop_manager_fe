import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import  { getOrder,editOrder,orderDetail } from "../../services/orderService";
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
            <div className="mt-3 section-title">
                <h2>Order history</h2>
            </div>

            {orders.length === 0 && <><p style={{textAlignLast:"center", fontSize:100, height:300, marginTop:200}}>No order </p></>}
            <div className="row">
                <div className="col-12" >
                    <table style={{textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Receiver</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Total Price</th>
                                <th>Time</th>
                                <th>Status</th>
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
                                <td>{order.orderDate}</td>
                                <td><button className="btn btn-outline-secondary" onClick={() => { dispatch(editOrder(order.orderId))}}>{order.status}</button></td>
                                <td>
                                    <button className="btn btn-outline-secondary" onClick={() => {
                                        dispatch(orderDetail(order.orderId)).then(()=>navigate(`/order-detail/${order.orderId}`))
                                    } }>Detail</button>
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