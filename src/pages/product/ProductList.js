import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findByName, findByNameProduct, findByPrice, getProducts} from "../../services/productsService";
import button from "bootstrap/js/src/button";
import {getCategory} from "../../services/categoruService";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";


export default function ProductList() {


    const dispatch = useDispatch();

    const categories = useSelector(state => {
        return   state.categories.category
    })

    useEffect(()=>{
        dispatch(getCategory()).then(()=>{
        })
    },[]);

    const products = useSelector(state => {
        return   state.products.products
    })


    useEffect(() => {
        dispatch(getProducts())
    }, []);

    const productss = products.slice(0,3)


    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link style={{textDecoration:"none"}} to="/home">Home<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active">Products</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="shop-sidebar">
                                <div className="single-widget category">
                                    <h3 className="title">Categories</h3>
                                    <ul className="categor-list" style={{}}>
                                        {categories.map((category)=>(
                                            <li  className="nav-item"><p style={{height:30,fontSize:10,width:200}} className="  btn btn-outline-secondary my-2 my-sm-0 " onClick={()=>{
                                                dispatch(findByName(category.name))
                                            }} >{category.name}</p></li>
                                        ))}

                                    </ul>
                                </div>
                                <div className="single-widget range">
                                    <h3 className="title">Shop by Price</h3>
                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <div id="slider-range"></div>
                                            <div className="price_slider_amount">
                                                <Formik
                                                initialValues={{
                                                    min: '',
                                                    max: ''
                                                }}
                                                onSubmit={(values)=>{
                                                    dispatch(findByPrice(values))
                                                }}>
                                                    <Form>
                                                        <div className="label-input" style={{textAlign:"center"}}>
                                                            <span>Range</span>
                                                            <div>
                                                                <Field  type="text" id="amount1" name="min" placeholder="Min Your Price" style={{border:'1px solid', background:'white',marginBottom:10 }}/>
                                                                <Field type="text" id="amount2" name="max" placeholder="Max Your Price" style={{border:'1px solid', background:'white' }}/>
                                                            </div>
                                                        </div>
                                                        <div style={{textAlign:"center", marginTop:10}}>
                                                        <button style={{height:30}} className="  btn btn-outline-secondary my-2 my-sm-0 " >Filter</button>
                                                        </div>
                                                    </Form>
                                            </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-widget recent-post">
                                    <h3 className="title">Hot Products</h3>
                                    {productss.map((product, ind)=>(
                                    <div className="single-post first">
                                        <div className="image">
                                            <img className="default-img"
                                                 src={product.image} alt="#" style={{width:75, height:75}}/>
                                        </div>
                                        <div className="content">
                                            <h5><a style={{textDecoration:"none"}} href={`/home/focus-product/${product.id}`}>{product.name}</a></h5>
                                            <p className="price">{product.price}$</p>

                                        </div>
                                    </div>
                                        ))
                                    }
                                </div>
                                <div className="single-widget category">
                                    <h3 className="title">Manufacturers</h3>
                                    <ul className="categor-list">
                                        <li><a href="#">Forever</a></li>
                                        <li><a href="#">giordano</a></li>
                                        <li><a href="#">abercrombie</a></li>
                                        <li><a href="#">ecko united</a></li>
                                        <li><a href="#">zara</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-top">
                                        <div className="shop-shorter">
                                            <div className="single-shorter">
                                            </div>
                                            <div className="single-shorter">
                                                <label>Sort By </label>
                                                <form className="form-inline my-2 my-lg-0">
                                                    <input  style={{marginLeft:550, border:10}} className="form-control mr-sm-2" type="search"
                                                           placeholder="Search" aria-label="Search" onChange={(e)=>{
                                                                dispatch(findByNameProduct(e.target.value))
                                                    }}/>
                                                        <button className="  btn btn-outline-secondary my-2 my-sm-0 "
                                                                type="submit">Search
                                                        </button>
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            {products.map((product, ind)=>(
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                                    <div className="single-product">
                                                        <div className="product-img">
                                                            <Link  style={{textDecoration: 'none'}} to={`/home/focus-product/${product.id}`}>
                                                                <img className="default-img"
                                                                     src={product.image} alt="#" style={{width:320, height:450}}/>
                                                                <span className="out-of-stock">{product.price} $</span>

                                                            </Link>
                                                            <div className="button-head">
                                                                <div className="product-action">
                                                                    <Link  style={{textDecoration: 'none'}} ><i className=" ti-eye"></i><span>Detail 142</span></Link>
                                                                    <Link  style={{textDecoration: 'none'}} title="Wishlist" href="#"><i
                                                                        className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                                                    <Link  style={{textDecoration: 'none'}} title="Compare" href="#"><i
                                                                        className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link>
                                                                </div>
                                                                <div className="product-action-2">
                                                                    <Link  style={{textDecoration: 'none'}}  to="/home/addCart">Add to cart</Link>
                                                                    <span> or </span>
                                                                    <Link  style={{textDecoration: 'none'}} to={`/home/buy-now/${product.id}`} style={{color: "red"}}>Buy now</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="product-content">
                                                            <h6 style={{textAlign:"center"}}>{product.name}</h6>
                                                            <div className="product-price">
                                                                <span style={{color:"red"}}></span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            }
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