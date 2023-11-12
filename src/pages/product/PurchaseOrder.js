import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import './tableOrder.css';

import {useParams} from "react-router-dom";
import {findByIdUser, showCart} from "../../services/orderService";

export default function PurchaseOrder() {
    const {idUser} = useParams();
    const dispatch = useDispatch();
    const orders = useSelector(state => {
        return state.orders.orders
    })

    const carts = useSelector(state => {
        return state.orders.cart
    })


    useEffect(() => {
        dispatch(findByIdUser(idUser))
    }, [])

    const [i , setI] = useState(-1)

    return (
        <>

            <div className="mt-3 section-title">
                <h2>Purchase Order</h2>
            </div>

            {orders.length === 0 && <><p style={{textAlignLast:"center", fontSize:100, height:300, marginTop:200}}>No order </p></>}
            {orders !== 'Can not find by id order' && orders.map((order, index) => (
                <>
                    <div className="row">
                        <div className="col-12" >
                            <table style={{textAlign: "center" }}>
                                <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Total Price</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                                <tbody>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.totalPoint}</td>
                                    <td>{order.time}</td>
                                    <td>{order.status}</td>
                                </tr>

                                 </tbody>
                                        <button className="btn btn-outline-secondary" onClick={() => {
                                            dispatch(showCart(order.id))
                                            setI(index)
                                        }}>Detail
                                        </button>
                            </table>
                        </div>
                    </div>

                            {index === i && carts !== 'Saved cart' &&
                                <>
                                    <div className="row" id="table1">
                                        <div className="col-12">
                                            <div className="shopping-cart section">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <table className="table shopping-summery">
                                                                <thead>
                                                                    <tr className='.bg-secondary'>
                                                                        <th>Image</th>
                                                                        <th>Name</th>
                                                                        <th>Price</th>
                                                                        <th>Quantity</th>
                                                                        <th>Total</th>
                                                                        <th>Description</th>
                                                                    </tr>
                                                                </thead>

                                                                 {carts.map(item => (
                                                                <tbody>
                                                                <tr>
                                                                    <td><img src={item.image} alt="" style={{width: 50}}/></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.total}</td>
                                                                    <td>{item.description}</td>
                                                                </tr>
                                                                </tbody>
                                                                ))}
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                }

                    <hr/>
                </>

            ))
            }


        </>
    )
}