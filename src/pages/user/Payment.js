import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findByProductId} from "../../services/productService";
import {addOrder } from "../../services/orderService";
import swal from "sweetalert";

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
                productName:product.productName,
                price:product.price,
                description: product.description,
                inventory: product.inventory,
                categoryId: product.categoryId,
                image: product.image,
                quantity: total/product.price,
            }]
        };
        dispatch(addOrder(data)).then((e)=>{
            swal("Thành công!", {
                icon: "success",
            });
            navigate('/list-product')
        })
    }

    useEffect(() => {
        dispatch(findByProductId(id))
    }
    , [id, dispatch]);

return(
    <>
    <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Trang chủ<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="">Thanh toán</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="mt-3 section-title">
            <h2>Sản phẩm</h2>
        </div>


        <Formik
            initialValues={{
                receiver:'',
                address:'',
                phone:'', 
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
                                        <th>Sản phẩm</th>
                                        <th>Tên</th>
                                        <th className="text-center">Giá</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-center">Tổng</th>

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
                                    <label htmlFor="exampleInput" className="form-label">Người nhận</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'receiver'}/>
                                </div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Số điện thoại</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'phone'}/>
                                </div>
                                <div className="mb-3" style={{width:350,margin:"auto"}}>
                                    <label htmlFor="exampleInput" className="form-label">Địa chỉ</label>
                                    <Field type="text" className="form-control" id="exampleInput" name={'address'}/>
                                </div>
                                <div style={{marginBottom:3, textAlign:"center"}}>
                                    <button type="submit" style={{width: 200}}
                                            className="mt-3 btn btn-outline-danger">Mua ngay
                                    </button>
                                </div>
                        </div>

                </div>

            </Form>
        </Formik>
    </>
)
}