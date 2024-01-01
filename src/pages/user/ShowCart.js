import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addOrder} from "../../services/orderService";
import { showCart, deleteCart } from "../../services/cartService";
import {Link, useNavigate} from "react-router-dom";

export default function ShowCart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        return state.user.currentUser
    });

    const carts = useSelector(state => {
        return state.carts.carts
    });

    useEffect(() => {
        dispatch(showCart(user.userId))
    }
    , [user.userId, dispatch]);

    let totalAmount = 0;
    return (
        <>
            {
                carts.length === 0 || carts === 'Saved cart'? <>
                    <p style={{textAlignLast:"center", fontSize:100, height:300, marginTop:200}}>No product</p>

                </> : <>
                    <div className="breadcrumbs">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="bread-inner">
                                        <ul className="bread-list">
                                            <li><a href={"/"}>Home<i className="ti-arrow-right"></i></a></li>
                                            <Link style={{ textDecoration: 'none' }}>Cart</Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shopping-cart section">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <table className="table shopping-summery">
                                        <thead>
                                        <tr className="main-hading">
                                            <th>PRODUCT</th>
                                            <th>NAME</th>
                                            <th className="text-center">UNIT PRICE</th>
                                            <th className="text-center">QUANTITY</th>
                                            <th className="text-center">TOTAL</th>
                                            <th className="text-center"><i className="ti-trash remove-icon"></i></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {carts !== 'Saved cart' && carts.map(item => {
                                            totalAmount += ( item.price * item.quantity );
                                            return (
                                                <tr key={item.cartId}>
                                                    <td className="image" data-title="No"><img src={item.image} alt="" style={{width: 50}}/>
                                                    </td>
                                                    <td className="product-des" data-title="Description">
                                                        {item.productName}
                                                    </td>
                                                    <td className="price" data-title="Price">{item.price} $</td>
                                                    <td className="product-des" data-title="Description">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="total-amount" data-title="Total">
                                                        <span>{item.price * item.quantity} $</span></td>
                                                    <td className="action" data-title="Remove"><Link style={{textDecoration:"none"}} to="#"><i
                                                        className="ti-trash remove-icon" 
                                                        onClick={()=> dispatch( deleteCart(`${item.cartId}`))}></i></Link></td>
                                                </tr>
                                            )
                                        }

                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="total-amount">
                                        <div className="row">
                                            <div  className="col-lg-4 col-md-7 col-12">
                                                <div className="mt-3 right">
                                                    <>
                                                            <ul>
                                                                <li>Cart Subtotal<span>{totalAmount} $</span></li>
                                                                <li>Shipping<span>Free</span></li>
                                                                <li className="last">You Pay<span>{totalAmount} $</span>
                                                                </li>
                                                            </ul>
                                                            <div>
                                                                <a href={'/list-product'}>
                                                                    <button style={{width: 200, marginLeft: 50}}
                                                                            className="mt-3 btn btn-outline-secondary">Continue
                                                                        shopping
                                                                    </button>
                                                                </a>
                                                            </div>
                                                        </>
                                                </div>
                                            </div>
                                                 <div  className="col-lg-4 col-md-7 col-12">
                                                    <div  style={{marginLeft:300}}>
                                                        <Formik
                                                            initialValues={{
                                                                receiver: '',
                                                                address: '',
                                                                phone: '',
                                                                totalAmount: totalAmount
                                                            }}
                                                            onSubmit={(values) => {
                                                                const data = {
                                                                    order : {
                                                                        userId: user.userId,
                                                                        receiver: values.receiver,
                                                                        address: values.address,
                                                                        phone: values.phone,
                                                                        totalAmount: totalAmount
                                                                    },
                                                                    orderDetail : carts.map(({ productId, productName, price, description, inventory, categoryId, image, quantity }) => ({ productId, productName, price, description, inventory, categoryId, image, quantity }))
                                                                };
                                                                dispatch(addOrder(data))
                                                                navigate('/list-product');
                                                            }}
                                                        >

                                                            <Form>
                                                                <div className="mb-3" style={{width:300}}>
                                                                    <label htmlFor="exampleInput" className="form-label">Receiver</label>
                                                                    <Field type="text" className="form-control" id="exampleInput" name={'receiver'}/>
                                                                </div>
                                                                <div className="mb-3" style={{width:300}}>
                                                                    <label htmlFor="exampleInput" className="form-label">Address</label>
                                                                    <Field type="text" className="form-control" id="exampleInput" name={'address'}/>
                                                                </div>
                                                                <div className="mb-3" style={{width:300}}>
                                                                    <label htmlFor="exampleInput" className="form-label">Phone</label>
                                                                    <Field type="text" className="form-control" id="exampleInput" name={'phone'} pattern="[0-9]{10}" title="Số điện thoại phải có 10 chữ số(ví dụ: 0987654321)"/>
                                                                </div>
                                                                <div style={{marginBottom:3}}>
                                                                    <button type="submit" style={{width: 200, marginLeft: 50}}
                                                                            className="mt-3 btn btn-outline-danger">Check Out
                                                                    </button>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="shop-services section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-service">
                                        <i className="ti-rocket"></i>
                                        <h4>Free shiping</h4>
                                        <p>Orders over $100</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-service">
                                        <i className="ti-reload"></i>
                                        <h4>Free Return</h4>
                                        <p>Within 30 days returns</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-service">
                                        <i className="ti-lock"></i>
                                        <h4>Sucure Payment</h4>
                                        <p>100% secure payment</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="single-service">
                                        <i className="ti-tag"></i>
                                        <h4>Best Peice</h4>
                                        <p>Guaranteed price</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </>}
        </>
    )
}
