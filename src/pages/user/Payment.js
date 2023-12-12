import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findByProductId} from "../../services/productService";
import {addOrder } from "../../services/orderService";

export default function Payment() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector(state=>{
        return state.user.currentUser
    })
    
    const product = useSelector(state => {
        return state.products.product
    });
    
    const [total,setTotal] = useState(1);

    const handleBuy = (values)=>{
        const data = {
            order:{
                userId: user.userId,
                totalAmount: total,
                receiver: values.receiver,
                address: values.address,
                phone: values.phone
            },
            orderDetail:[{
                productId: product.productId,
                quantity: values.quantity,
                price: product.price
            }]
        };
        dispatch(addOrder(data)).then((e)=>{
            navigate('/list-product')
        })
    }

    useEffect(() => {
        dispatch(findByProductId(id))
    }
    , [id, dispatch]);

return(
    <>
        <div className="mt-3 section-title">
            <h2>Product</h2>
        </div>


        <Formik
            initialValues={{
                receiver:'',
                address:'',
                phone:''
            }}
            onSubmit={(values)=>handleBuy(values)}>
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
                                                    {product.productName}
                                                </td>
                                                <td className="price" data-title="Price"> {product.price} $</td>
                                                <td className="product-des">
                                                    <div className="row">
                                                        <Field name={'quantity'}  style={{margin:"auto", width:100}} type="number" defaultValue={1} min={1} max={product.inventory} 
                                                        onChange={(e)=> setTotal(e.target.value * product.price)}/>
                                                    </div>

                                                </td>
                                                <td className="total-amount" data-title="Total">{total} $</td>
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
                                <div style={{marginBottom:3, textAlign:"center"}}>
                                    <button type="submit" style={{width: 200}}
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