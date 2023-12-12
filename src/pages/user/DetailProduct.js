import { useNavigate,useParams} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import { findByProductId, getProducts} from "../../services/productService";
import { addCart } from "../../services/cartService";
import swal from "sweetalert";

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
        swal("Added to cart!", {
            icon: "success",
        });
        navigate('/list-product')  
    }

    const products = useSelector(state => {
        return state.products.products
    });

    useEffect(()=>{
        dispatch(getProducts())
    },[]);

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
                                    <li><a href="index1.html">Home<i className="ti-arrow-right"></i></a></li>
                                    <li className="active"><a href="blog-single.html">Blog Single Sidebar</a></li>
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
                                        <div className="share-social">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="content-tags">
                                                        <h4>Tags:</h4>
                                                        <ul className="tag-inner">
                                                            <li><a href="#">Glass</a></li>
                                                            <li><a href="#">Pant</a></li>
                                                            <li><a href="#">t-shirt</a></li>
                                                            <li><a href="#">swater</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="main-sidebar">
                                <div className="single-widget category">
                                    <h3 className="title">{product.name}</h3>
                                    <ul className="categor-list">
                                        <li><p>Total Quantity: {product.inventory}.</p></li>
                                        <li><p>Brand:  {product.categoryName}</p></li>
                                        <li><p>Price: {product.price}</p></li>
                                        <li><p>Quantity: 
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
                                                <button style={{width:130}} className="btn btn-outline-secondary" onClick={ handleAddCart }> Add to cart </button>
                                                <button style={{width:130}} className="ml-3 btn btn-outline-danger" onClick={() => navigate('/payment',{state:{product,quantity}}) }> Buy now </button>
                                                </>
                                                :
                                                <>
                                                <button style={{width:130}} className="btn btn-outline-secondary" onClick={()=> navigate('/login')}> Add to cart </button>
                                                <button style={{width:130}} className="ml-3 btn btn-outline-danger" onClick={() => navigate('/login')}> Buy now </button>
                                                </>
                                                
                                                }
                                                
                                                
                                            </div>
                                         </li>
                                    </ul>
                                </div>
                                <div className="single-widget recent-post">
                                    <h3 className="title">Same Products</h3>
                                    {nimitProduct.map((products) => (
                                        <div  key={products.productId} className="single-post">
                                            <div className="image">
                                                <a style={{textDecoration:"none"}} href={`/deetail-product`}> <img src={products.image} alt="" style={{width: 100}}/>  </a>
                                            </div>
                                            <div className="content">
                                                <a style={{textDecoration:"none"}} href={`/detail-product`}><h6 >{products.productName}</h6>

                                                </a>
                                            </div>
                                        </div>
                                        ))}


                                </div>

                                <div className="single-widget side-tags">
                                    <h3 className="title">Tags</h3>
                                    <ul className="tag">
                                        <li><a href="#">business</a></li>
                                        <li><a href="#">wordpress</a></li>
                                        <li><a href="#">html</a></li>
                                        <li><a href="#">multipurpose</a></li>
                                        <li><a href="#">education</a></li>
                                        <li><a href="#">template</a></li>
                                        <li><a href="#">Ecommerce</a></li>
                                    </ul>
                                </div>

                                <div className="single-widget newsletter">
                                    <h3 className="title">Newslatter</h3>
                                    <div className="letter-inner">
                                        <h4>Subscribe & get news latest updates.</h4>
                                        <div className="form-inner">
                                            <input type="email" placeholder="Enter your email"/>
                                            <a href="#">Submit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}