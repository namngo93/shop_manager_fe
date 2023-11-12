import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findByStatus, showCart} from "../services/orderService";


export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>{
        return state.user.currentUser
    })

    const order = useSelector(state=>{
        return state.orders.order
    })


    const carts = useSelector(state => {
        return state.orders.cart
    })



    useEffect(()=>{
        dispatch(findByStatus(user.idUser)).then(()=> {
            if(order) {
                dispatch(showCart(order.id)).then(()=>{
                }).then(()=>{
                })
            }

        });
    },[])


    let totalPoint = 0;
    return(
        <>
                <header className="header shop">
                    <div className="topbar">
                        <div className="container" >
                            <div className="row">
                                <div className="col-lg-4 col-md-12 col-12">

                                    <div className="top-left">
                                        <ul className="list-main">
                                            <li><i className="ti-headphone-alt"></i> +0692326555</li>
                                            <li><i className="ti-email"></i> trungponhup@gmail.com</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-lg-8 col-md-12 col-12">

                                    <div className="right-content">
                                        <ul className="list-main">
                                            <li><i className="ti-location-pin"></i><Link style={{textDecoration:"none"}} to="https://www.google.com/maps/@20.9997628,105.8071965,16z?hl=vi-VN">Store location</Link> </li>
                                            <li><i className="ti-alarm-clock"></i> <Link  style={{textDecoration: 'none'}} to={`/home/purchase-order/${user.idUser}`}>History</Link></li>
                                            <li><i className="ti-user"></i> <Link  style={{textDecoration: 'none'}} to="#" >{user.username}</Link></li>
                                            <li><i className="ti-power-off"></i><a type={'summit'} onClick={()=>{
                                                localStorage.clear()
                                                navigate('/')
                                            }}>Logout</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="middle-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-12">

                                    <div className="logo">
                                        <Link  style={{textDecoration: 'none'}} to="/home"><img style={{width:110,height:80}} src="/images/logo3.png" alt="logo"/></Link>
                                    </div>

                                </div>
                                <div className="col-lg-8 col-md-7 col-12">

                                    <div className="mobile-nav">
                                        <Link  style={{textDecoration: 'none'}} to="/home"><img style={{width:1000,height:150}} src="/images/bia.png" alt="logo"/></Link>
                                    </div>

                            </div>
                                <div className="col-lg-2 col-md-3 col-12">
                                    <div className="right-bar">

                                        <div className="sinlge-bar">
                                            <Link  style={{textDecoration: 'none'}} to="#" className="single-icon"><i className="fa fa-heart-o" aria-hidden="true"></i></Link>
                                        </div>
                                        <div className="sinlge-bar">
                                            <Link  style={{textDecoration: 'none'}} to={`/home/purchase-order/${user.idUser}`} className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link>
                                        </div>
                                        <div className="sinlge-bar shopping">
                                            <Link  style={{textDecoration: 'none'}} to={`/home/show-cart/${order.id}`} className="single-icon"><i className="ti-bag"></i> <span className="total-count">{carts.length}</span></Link>

                                            <div className="shopping-item" >
                                                <div className="dropdown-cart-header">
                                                    <span>{carts.length} Items</span>
                                                    <Link  style={{textDecoration: 'none'}} to="#">View Cart</Link>
                                                </div>
                                                <ul className="shopping-list">
                                                    {carts.length !== 0 && carts !== 'Saved cart'&&
                                                        <>
                                                            {carts.map((item)=>(
                                                                totalPoint += item.total,
                                                                <li>
                                                                    <img src={item.image} alt="#" style={{width:50}}/>
                                                                    <h4>{item.name}</h4>
                                                                    <p>{item.quantity} x - <span className="amount">$ {item.price}</span></p>
                                                                </li>
                                                            ))
                                                            }
                                                            </>}
                                                </ul>
                                                <div className="bottom">
                                                    <div className="total">
                                                        <span>Total</span>
                                                        <span className="total-amount">{totalPoint}</span>
                                                    </div>
                                                    <Link  style={{textDecoration: 'none'}} to={`/home/show-cart/${order.id}`} className="btn animate">Checkout</Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header-inner">
                        <div className="container">
                            <div className="cat-nav-head">
                                <div className="row">
                                    <div className="col-lg-9 col-12">
                                        <div className="menu-area">
                                            <nav className="navbar navbar-expand-lg">
                                                <div className="navbar-collapse">
                                                    <div className="nav-inner">
                                                        <ul className="nav main-menu menu navbar-nav">
                                                            <li className="active"><a  style={{textDecoration: 'none'}} href="/home" >Home</a></li>
                                                            {user.role === 'admin' &&
                                                                <>
                                                                    <li><Link  style={{textDecoration: 'none'}} to="#">Manager <i className="ti-angle-down"></i></Link>
                                                                        <ul className="dropdown">
                                                                            <li><a  style={{textDecoration: 'none'}} href="/home/manager-product">Manager Product</a></li>
                                                                            <li><a  style={{textDecoration: 'none'}} href="/home/manager-order">Manager Order</a></li>
                                                                        </ul>
                                                                    </li>
                                                                    <li><Link  style={{textDecoration: 'none'}} to="#">Add  <i className="ti-angle-down"></i></Link>
                                                                    <ul className="dropdown">
                                                                        <li><Link  style={{textDecoration: 'none'}} to="/home/add-category">Add Category</Link></li>
                                                                        <li><Link  style={{textDecoration: 'none'}} to="/home/add-product">Add Product </Link></li>
                                                                    </ul>
                                                                    </li>
                                                                </>
                                                            }
                                                            <li><Link  style={{textDecoration: 'none'}} to="my-product">Products</Link></li>

                                                            <li><Link  style={{textDecoration: 'none'}} to="#">About</Link></li>

                                                            <li><Link  style={{textDecoration: 'none'}} to="/home/people">People</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </nav>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
            
        </>
    )
}