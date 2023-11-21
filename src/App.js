import './App.css';
import {Route, Routes} from "react-router";
import {useSelector} from "react-redux";
import User from "./pages/user/User";
import Admin from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import ListProduct from "./pages/user/ListProduct";
import DetailProduct from "./pages/user/DetailProduct";
import ShowCart from "./pages/user/ShowCart";
import OrderHistory from "./pages/user/OrderHistory";
import Payment from "./pages/user/Payment";
import Information from "./pages/user/Information";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";

function App() {
  // service -> slice -> store -> selector -> useEffect
  const user = useSelector(state=>{
    return state.user.currentUser
  })

  return (
      <>
        <div className="container-fluid">
       
          <Routes>
            {/* Trang cua nguoi dung */}
            <Route path={''} element={<User/>}>  

              {/*  trang khong can dang nhap */}
              <Route path={''} element={<Home/>}/>  {/* Trang chu */}
              <Route path={'list-product'} element={<ListProduct/>}/>  {/* Trang danh sach san pham */}
              <Route path={'detail-product'} element={<DetailProduct/>}/>  {/* Trang chi tiet san pham */}
              <Route path={'login'} element={<Login/>}/> 
              <Route path={'register'} element={<Register/>}/>

              {/* Trang phai dang nhap */}
              { user !== 'Username is not existed' && user !== 'Password is wrong' ?
                <>
                  <Route path={'show-cart'} element={<ShowCart/>}/>  {/* Trang gio hang */}
                  <Route path={'order-history/:idUser'} element={<OrderHistory/>}/>  {/* Trang lich su don hang */}
                  <Route path={'payment'} element={<Payment/>}/>    {/* Trang mua hang/ thanh toan*/}
                  <Route path={'information'} element={<Information/>}/> {/* Trang thong tin nguoi dung*/}
                </>
                :
                <Route path={'login'} element={<Login/>}/>
              }
            </Route>
            { user.role === 1 &&
              <Route path={'admin'} element={<Admin/>}>
                <Route path={'product-management'} element={<ProductManagement/>}/>
                <Route path={'order-management'} element={<OrderManagement/>}/>
                <Route path={'category-management'} element={<OrderManagement/>}/>
                <Route path={'user-management'} element={<OrderManagement/>}/>
              </Route>
                
            }

          </Routes>
        </div>
      </>
  );
}

export default App;
