import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showCart } from "../services/cartService";


export default function Navbar(){
    const dispatch = useDispatch();
    const user = useSelector(state=>{
        return state.user.currentUser
    });

    const carts = useSelector(state => {
        return state.carts.carts
    });

    const pointerEvents = user.userId ? 'auto': 'none'; //khóa chuyển trang khi chưa đăng nhập

    useEffect(() => {
        if (user.userId) {
            dispatch(showCart(user.userId));
        }
    }, [user.userId, dispatch]);

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
                                            <li><i className="ti-location-pin"></i><Link style={{textDecoration:"none"}} to="https://www.google.com/maps/@20.9997628,105.8071965,16z?hl=vi-VN">Bản đồ</Link> </li>
                                            <li><Link  style={{textDecoration: 'none', pointerEvents:`${pointerEvents}`}} to={`/order-history`}><i className="ti-alarm-clock"></i> Lịch sử</Link></li>
                                            {user.userId ? 
                                            <>
                                            <li><Link  style={{textDecoration: 'none', pointerEvents:`${pointerEvents}`}} to="/information" ><i className="ti-user"></i> {user.userName}</Link></li>
                                            <li><a style={{textDecoration: 'none'}} href="/" type={'summit'} onClick={()=>{
                                                localStorage.clear();
                                            }}><i className="ti-power-off"></i> Đăng xuất</a></li>
                                            </> : 
                                            <li><a style={{textDecoration: 'none'}} href="/login" type={'summit'}><i className="ti-power-off"></i> Đăng nhập</a></li>}
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
                                        {/* <div className="sinlge-bar">
                                            <Link  style={{textDecoration: 'none'}} to={`/purchase-order`} className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link>
                                        </div> */}
                                        <div className="sinlge-bar shopping">
                                            <Link  style={{pointerEvents: `${pointerEvents}`}} to={`/show-cart`} className="single-icon"><i className="ti-bag"></i> <span className="total-count">{carts.length}</span></Link>
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
                                                            <li className="active"><Link  style={{textDecoration: 'none'}} to="/" >Trang chủ</Link></li>
                                                            {user.role === 1 ?
                                                            <>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/admin/product-management" >Sản phẩm <i className="ti-angle-down"></i> </Link>
                                                                    <ul className="dropdown">
                                                                            <li><Link  style={{textDecoration: 'none'}} to="/admin/product-add">Thêm mới ản phẩm </Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/admin/category-management">Danh mục <i className="ti-angle-down"></i></Link>
                                                                    <ul className="dropdown">
                                                                            <li><Link  style={{textDecoration: 'none'}} to="/admin/category-add">Thêm mới danh mục </Link></li>
                                                                    </ul>
                                                                </li>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/admin/order-management">Đơn hàng</Link></li>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/admin/user-management">Người dùng</Link></li>
                                                            </>:
                                                            <>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/list-product">Danh sách sản phẩm</Link></li>
                                                                {user.userId && 
                                                                <>
                                                                <li><Link  style={{textDecoration: 'none'}} to="/order-history">Lịch sử mua hàng</Link></li>

                                                                <li><Link  style={{textDecoration: 'none'}} to="/information">Thông tin <i className="ti-angle-down"></i></Link>
                                                                <ul className="dropdown">
                                                                            <li><Link  style={{textDecoration: 'none'}} to="/changePw">Đổi mật khẩu </Link></li>
                                                                    </ul></li>
                                                                </>
                                                                }
                                                            
                                                            </>
                                                            }
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