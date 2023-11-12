import {Link} from "react-router-dom";



export default function userNavbar(){
  


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
                                            <li><i className="ti-alarm-clock"></i> <Link  style={{textDecoration: 'none'}} to="#">History</Link></li>
                                            <li><i className="ti-user"></i> <Link  style={{textDecoration: 'none'}} to="#" >Login</Link></li>
                                            <li><i className="ti-user"></i> <Link  style={{textDecoration: 'none'}} to="#" >SS</Link></li>
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