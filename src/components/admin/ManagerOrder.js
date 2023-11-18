import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {editOrder, getOrder, showCart} from "../../services/orderService";
import {useNavigate} from "react-router-dom";


export default function ManagerOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(state => {
        return state.orders.orders
    })
    const carts = useSelector(state => {
        return state.orders.cart
    })


    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const [i, setI] = useState(-1)
    return (
        <>
            <div className="mt-3 section-title">
                <h2>Manager Order</h2>
            </div>

            {orders !== 'Can not find by id order' && orders.map((order, index) => (
                <>
                    <div className="row" id="table1">
                        <div className="col-12">
                            <div className="shopping-cart section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <table className="table shopping-summery">
                                                <thead>
                                                <tr className="main-hading">
                                                    <th>Order ID</th>
                                                    <th>Total Price</th>
                                                    <th className="text-center">Time</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Phone</th>
                                                    <th className="text-center">Username</th>
                                                    <th className="text-center">Address</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>  {order.id}</td>
                                                    <td> {order.totalPoint}</td>
                                                    <td> {order.time}</td>
                                                    <td> {order.status}</td>
                                                    <td> {order.phone}</td>
                                                    <td> {order.username}</td>
                                                    <td> {order.address}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div className="row">
                        <div className="mb-3 col-12 " style={{textAlign:"center"}}>
                            <button className="btn btn-outline-secondary " onClick={() => {
                                dispatch(showCart(order.id))
                                setI(index)
                            }}>Detail
                            </button>
                            {order.status === "loading" &&
                                <button className="ml-3 btn btn-outline-secondary " onClick={() => {
                                let value = {
                                    id: order.id,
                                    status: 'moving'
                                }
                                dispatch(editOrder(value))
                            }}>Confirm
                            </button>}

                        </div>
                    </div>
                    {index === i && carts !== 'Saved cart' &&
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <table style={{textAlign: "center"}}>
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

                        </>
                    }
                    <hr/>
                </>
            ))
            }

        </>
    )
}