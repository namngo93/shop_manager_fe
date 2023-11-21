import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addOrder, deleteCart, editOrder,showCart} from "../../services/orderService";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function ShowCart() {
    const {idOrder} = useParams();

    const navigate = useNavigate()

    const user = useSelector(state => {
        return state.user.currentUser
    })


    const dispatch = useDispatch();

    const carts = useSelector(state => {
        return state.orders.cart
    })


    useEffect(() => {
        dispatch(showCart(idOrder))
    }, [])

    let totalPoint = 0;
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
                                            <li><a href={"/home"}>Home<i className="ti-arrow-right"></i></a></li>
                                            <li className="active"><a href="#">Cart</a></li>
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
                                        {carts !== 'Saved cart' && carts.map(item => (
                                            totalPoint += item.total,

                                                <tr>
                                                    <td className="image" data-title="No"><img src={item.image} alt="" style={{width: 50}}/>
                                                    </td>
                                                    <td className="product-des" data-title="Description">
                                                        {item.name}
                                                    </td>
                                                    <td className="price" data-title="Price">{item.price} $</td>
                                                    <td className="product-des" data-title="Description">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="total-amount" data-title="Total">
                                                        <span>{item.total} $</span></td>
                                                    <td className="action" data-title="Remove"><Link style={{textDecoration:"none"}} to="#"><i
                                                        className="ti-trash remove-icon" onClick={()=>{
                                                            dispatch(deleteCart(item.id)).then(()=>{
                                                                dispatch(showCart(idOrder))
                                                            })
                                                    }}></i></Link></td>
                                                </tr>
                                        ))}
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
                                                                <li>Cart Subtotal<span>{totalPoint} $</span></li>
                                                                <li>Shipping<span>Free</span></li>
                                                                <li className="last">You Pay<span>{totalPoint} $</span>
                                                                </li>
                                                            </ul>
                                                            <div>
                                                                <a href={'/home'}>
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
                                                                id: idOrder,
                                                                receiver: '',
                                                                address: '',
                                                                phone: '',
                                                                time: '',
                                                                totalPoint: totalPoint
                                                            }}
                                                            onSubmit={(values) => {
                                                                values.status = 'loading';
                                                                values.totalPoint = totalPoint;
                                                                dispatch(editOrder(values)).then(() => {
                                                                    let order = {
                                                                        idUser: user.idUser,
                                                                        receiver: user.username,
                                                                        address: 'hd',
                                                                        phone: 0,
                                                                        time: '2023-02-24 00:29:52',
                                                                        totalPoint: 0,
                                                                        status: 'buying'
                                                                    }
                                                                    dispatch(addOrder(order)).then((e)=>{
                                                                        dispatch(showCart(e.payload.id))
                                                                    });

                                                                    navigate('/home');

                                                                })
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
                                                                    <Field type="text" className="form-control" id="exampleInput" name={'phone'}/>
                                                                </div>
                                                                <div className="mb-3" style={{width:300}}>
                                                                    <label htmlFor="exampleInput" className="form-label">Time</label>
                                                                    <Field type="date" className="form-control" id="exampleInput" name={'time'}/>
                                                                </div>
                                                                <div style={{marginBottom:3}}>
                                                                    <button style={{width: 200, marginLeft: 50}}
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
