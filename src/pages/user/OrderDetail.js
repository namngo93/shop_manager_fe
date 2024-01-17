import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import  { orderDetail } from "../../services/orderService";
import { useParams } from "react-router";

export default function OrderDetail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const order = useSelector(state => {
        return state.orders.order
    });
    const orderItem = useSelector(state => {
        return state.orders.orderDetail
    });

    useEffect(() => {
        dispatch(orderDetail(id))
    }, [id,dispatch]);

    return (
        <>
            <div className="mt-3 section-title">
                <h2>Chi tiết đơn</h2>
            </div>
            <div className="row">
                <div className="col-12" >
                    <table style={{textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>ID đơn hàng</th>
                                <th>ID người mua</th>
                                <th>Người nhận</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Tổng đơn</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order !== undefined &&
                            <tr key={order.orderId} style={{marginBottom: 16}}>
                            <td>{order.orderId}</td>
                            <td>{order.userId}</td>
                            <td>{order.receiver}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.status}</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                    <table className="table table-striped" border={1} style={{textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>ID sản phẩm</th>
                                <th>Tên</th>
                                <th>Ảnh</th>
                                <th>Mô tả</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItem.length > 0 && orderItem.map((item)=>(
                            <tr key={item.orderDetailId} style={{marginBottom: 16}}>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td><img src={item.image} style={{width:50}} alt="#"/></td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}