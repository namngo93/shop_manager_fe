import { Link, useNavigate,useParams} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import { findByProductId, getProducts} from "../../services/productService";
import { addCart } from "../../services/cartService";
import { getReviews, editReview, createReview, replyReview, deleteReview} from "../../services/reviewService"
import swal from "sweetalert";
import { Form, Field, Formik } from "formik";

export default function DetailProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const product = useSelector(state => {
        return state.products.product
    });
    const user = useSelector(state => {
        return state.user.currentUser
    });

    const reviews = useSelector(state => {
        return state.reviews.reviews
    });

    const [quantity, setQuantity] = useState(1)

    const handleAddCart = () => {
        const data = {
            userId: user.userId,
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            description: product.description,
            inventory: product.inventory,
            categoryId: product.categoryId,
            image: product.image,
            quantity: quantity
        };
        dispatch(addCart(data));
        swal("Thêm giỏ hàng thành công!", {
            icon: "success",
        });
        navigate('/list-product')  
    }

    const products = useSelector(state => {
        return state.products.products
    });

    const [isReplyShown, setIsReplyShown] = useState(null);
    const [isFeedbackShown, setIsFeedbackShown] = useState(null);
    const [isEditFormShown, setIsEditFormShown] = useState(null);

    useEffect(()=>{
        dispatch(getProducts())
    },[]);

    useEffect(()=>{
        dispatch(getReviews(id))
    },[id, dispatch]);

    useEffect(()=>{
        dispatch(findByProductId(id))
    },[id, dispatch]);

    const nimitProduct = products.slice(0,3)

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Trang chủ<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="">Chi tiết sản phẩm</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="blog-single section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="blog-single-main">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="image">
                                            <img src={product.image} alt="" style={{width: 700}}/>
                                        </div>
                                        <div className="blog-detail">
                                            <h2 className="blog-title">{product.name}</h2>
                                            <div className="content">
                                                <p>{product.description}</p>


                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-12">
									<div className="comments">
                                        <h3 className="comment-title">Bình luận ({reviews.length}) </h3>
										{/* Single Comment */}
                                        {reviews.length !== 0 && reviews.map( (review, ind) => (
                                            <div key={review.reviewId}>
                                            <div  className="single-comment">
                                                <div className="content">
                                                {review.userId === user.userId?
                                                    <h4>Tôi <span>{new Date(review.reviewDate).toLocaleString()}</span></h4>:
                                                    <h4>{review.userName} <span>{new Date(review.reviewDate).toLocaleString()}</span></h4>
                                                }
                                                    
                                                    {isEditFormShown === ind ?
                                                        <Formik 
                                                            initialValues={{comment: review.comment}}
                                                            onSubmit={(values) => {
                                                                const data = {
                                                                    reviewId: review.reviewId,
                                                                    productId: id,
                                                                    comment: values.comment
                                                                }
                                                                dispatch(editReview(data));
                                                                setIsEditFormShown(null);
                                                            }}
                                                        >
                                                            <Form className="form single-comment" action="#">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <Field name="comment" placeholder=""/>
                                                                            <button type="submit" className="btn btn-outline-secondary ">Gửi</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Form>  
                                                        </Formik>:
                                                        <p>{review.comment}</p>
                                                    }
                                                    <div className="button" style={{display: "flex", gap: 20}}>
                                                    {user.userId === review.userId &&
                                                    <>
                                                        <p type="button" onClick={() => {
                                                            if(isEditFormShown === ind) {
                                                                setIsEditFormShown(null);
                                                            } else {
                                                                setIsEditFormShown(ind);
                                                            }
                                                        }}> Sửa </p>
                                                        <p type="button" onClick={() => {dispatch(deleteReview(review.reviewId))}}> Xóa </p>
                                                    </>
                                                    }
                                                    {user.role === 1 && !review.reply.userId  &&
                                                    <p type="button" onClick={() => {
                                                        if(isReplyShown === ind) {
                                                            setIsReplyShown(null);
                                                        } else {
                                                            setIsReplyShown(ind);
                                                        }
                                                        }}> Phản hồi </p>
                                                    }
                                                    {review.reply.userId &&
                                                    <p type="button" onClick={() => {
                                                        if(isFeedbackShown === ind) {
                                                            setIsFeedbackShown(null);
                                                        } else {
                                                            setIsFeedbackShown(ind);
                                                        }
                                                        }}> Nhận xét </p>
                                                    }
                                                    </div>
                                                </div>
										    </div>
                                            { isFeedbackShown === ind &&
                                            <div className="single-comment left">
                                                <div className="content">
                                                    <h4>Admin <span>{new Date(review.reply.date).toLocaleString()}</span></h4>
                                                    <p>{review.reply.comment}</p>
                                                    {user.userId == 1 && 
                                                    <p type="button" onClick={() => {
                                                        const data = {
                                                        reviewId: review.reviewId,
                                                        productId: id,
                                                        reply: {}
                                                        }
                                                        dispatch(replyReview(data));
                                                        setIsFeedbackShown(null);
                                                        }}> Xóa </p>
                                                    }
                                                </div>
										    </div>
                                            }
                                            { isReplyShown === ind &&
                                            <Formik 
                                                initialValues={{reply: ""}}
                                                onSubmit={(values) => {
                                                    const data = {
                                                        reviewId: review.reviewId,
                                                        productId: id,
                                                        reply: {
                                                            userId: user.userId,
                                                            userName: user.userName,
                                                            comment: values.reply,
                                                            date: new Date(),
                                                            }
                                                    }
                                                    dispatch(replyReview(data));
                                                    setIsReplyShown(null);
                                                    setIsFeedbackShown(ind);
                                                }}
                                            >
                                              <Form className="form single-comment" action="#">
                                                <div className="row">
                                                    <div className="col-12 d-flex">
                                                        <div className="form-group flex-grow-1">
                                                            <label htmlFor="reply">Tin nhắn của bạn<span> * </span></label>
                                                            <Field name="reply" id="reply" placeholder="" className="form-control" />
                                                        </div>
                                                        <button type="submit" className="btn btn-outline-secondary ml-3 align-self-end">Phản hồi</button>
                                                    </div>
                                                </div>
											</Form>  
                                            </Formik>
                                            }
                                            </div>
                                        
                                        ))
                                        }  
										{/* End Single Comment */} 
									</div>									
								</div>
                                {user.userId && 											
								<div className="col-12">			
									<div className="reply">
										<div className="reply-head">
											<h2 className="reply-title">Để lại bình luận</h2>
											{/* <!-- Comment Form --> */}
                                            <Formik 
                                                initialValues={{message: ""}}
                                                onSubmit={(values, { resetForm }) => {
                                                    const data = {
                                                        userId: user.userId,
                                                        productId: id,
                                                        comment: values.message,
                                                        reply: {}
                                                    }
                                                    dispatch(createReview(data));
                                                    resetForm();
                                                }}
                                            >
                                            {() =>(
                                              <Form className="form" action="#">
												<div className="row">
													<div className="col-12">
														<div className="form-group">
															<label htmlFor="message">Tin nhắn của bạn<span>*</span></label>
															<Field name="message" id="message" placeholder=""/>
														</div>
													</div>
													<div className="col-12">
														<div className="form-group button">
															<button type="submit" className="btn btn-outline-secondary ">Đăng bình luận</button>
														</div>
													</div>
												</div>
											</Form>  
                                            )}
                                            </Formik>
											{/* <!-- End Comment Form --> */}
										</div>
									</div>			
								</div>
                            }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="main-sidebar">
                                <div className="single-widget category">
                                    <h3 className="title">{product.name}</h3>
                                    <ul className="categor-list">
                                        <li><p>Tổng: {product.inventory}.</p></li>
                                        <li><p>Danh mục:  {product.categoryName}</p></li>
                                        <li><p>Giá: {product.price}</p></li>
                                        <li><p>Số lượng: 
                                            <span> 
                                            <input type="number" name={'quantity'} defaultValue = {1} min={1} max={product.inventory} onClick={(e) => setQuantity( e.target.value )}/>
                                            </span>
                                            </p>
                                            <p style={{color: "red"}}>{quantity * product.price}<span>$</span></p>
                                        </li>
                                        <li>
                                            <div>
                                                {user.userId?
                                                <>
                                                <button style={{width:130}} className="btn btn-outline-secondary" onClick={ handleAddCart }> + Giỏ hàng </button>
                                                <button style={{width:130}} className="ml-3 btn btn-outline-danger" onClick={() => navigate(`/payment/${product.productId}`) }>Mua ngay </button>
                                                </>
                                                :
                                                <>
                                                <button style={{width:130}} className="btn btn-outline-secondary" onClick={()=> navigate('/login')}> + Giỏ hàng </button>
                                                <button style={{width:130}} className="ml-3 btn btn-outline-danger" onClick={() => navigate('/login')}> Mua ngay </button>
                                                </>
                                                
                                                }
                                                
                                                
                                            </div>
                                         </li>
                                    </ul>
                                </div>
                                <div className="single-widget recent-post">
                                    <h3 className="title">Sản phẩm tương tự</h3>
                                    {nimitProduct.map((products) => (
                                        <div  key={products.productId} className="single-post">
                                            <div className="image">
                                                <a style={{textDecoration:"none"}} href={`/detail-product`}> <img src={products.image} alt="" style={{width: 100}}/>  </a>
                                            </div>
                                            <div className="content">
                                                <a style={{textDecoration:"none"}} href={`/detail-product`}><h6 >{products.productName}</h6>

                                                </a>
                                            </div>
                                        </div>
                                        ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}