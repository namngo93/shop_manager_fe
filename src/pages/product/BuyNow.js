import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findByIdProduct} from "../../services/productsService";
import {addCart, addOrder, deleteCart, editOrder, showCart} from "../../services/orderService";

export default function BuyNow() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState()

    const user = useSelector(state=>{
        return state.user.currentUser
    })
    const product = useSelector(state => {
        return state.products.product
    });
    useEffect(() => {
        dispatch(findByIdProduct(id)).then((value) => {
        });
    }, []);

    const handleBuy = (values)=>{
        let order = {
            idUser: user.idUser,
            time: values.time,
            totalPoint: quantity * product.price,
            status: 'loading',
            receiver: values.receiver,
            address: values.address,
            phone: values.phone
        };

        dispatch(addOrder(order)).then((e)=>{
            let cart = {
                quantity: quantity,
                idProduct: id,
                total: quantity * product.price,
                idOrder: e.payload.id
            };
            dispatch(addCart(cart));
            navigate('/home')

        })
    }

return(
    <>
        <div className="mt-3 section-title">
            <h2>Product</h2>
        </div>


        <Formik
            initialValues={{
                receiver:'',
                time:'',
                address:'',
                phone:''
            }}
            onSubmit={(values)=>{
                handleBuy(values);
            }}>
            <Form>

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

                                    </tr>
                                    </thead>
                                    <tbody style={{textAlign:"center"}}>


                                            <tr>
                                                <td className="image" data-title="No"><img src={product.image} alt=""
                                                                                           style={{width: 100}}/>
                                                </td>
                                                <td className="product-des" data-title="name">
                                                    {product.name}
                                                </td>
                                                <td className="price" data-title="Price"> {product.price} $</td>
                                                <td className="product-des">
                                                    <div className="row">
                                                        <input  style={{margin:"auto", width:100}} type="number" min={1} onClick={(e)=>{
                                                            setQuantity(e.target.value)
                                                        }}/>
                                                    </div>

                                                </td>
                                                {quantity?
                                                    <td className="total-amount" data-title="Total">{quantity * product.price} $</td>:
                                                    <td className="total-amount" data-title="Total">{product.price} $</td>}


                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">

                        <div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Receiver</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'receiver'}/>
                                </div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Phone</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'phone'}/>
                                </div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Address</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'address'}/>
                                </div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Time</label>
                                    <Field type="date" className="form-control" id="exampleInput" name={'time'}/>
                                </div>
                                <div style={{marginBottom:3, textAlign:"center"}}>
                                    <button style={{width: 200}}
                                            className="mt-3 btn btn-outline-danger">Buy now
                                    </button>
                                </div>
                        </div>

                </div>

            </Form>
        </Formik>
    </>
)
}