import './App.css';
import {Route, Routes } from 'react-router';
import {useSelector} from "react-redux";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import ListProduct from "./pages/user/ListProduct";
import DetailProduct from "./pages/user/DetailProduct";
import ShowCart from "./pages/user/ShowCart";
import OrderHistory from "./pages/user/OrderHistory";
import Payment from "./pages/user/Payment";
import Information from "./pages/user/Information";
import ChangePw from "./pages/user/ChangePassword";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import UserManagement from "./pages/admin/UserManagement";
import ProductEdit from "./pages/admin/EditProduct";
import CategoryEdit from "./pages/admin/EditCategory";
import ProductAdd from "./pages/admin/AddProduct";
import CategoryAdd from "./pages/admin/AddCategory";
import OrderDetail from './pages/user/OrderDetail';

function App() {
  // service -> slice -> store -> selector -> useEffect
  const user = useSelector(state=>{
    return state.user.currentUser
  })
  
  return (
      <>
        <div className="container-fluid">
          <Routes>
            

            {/* Trang cua admin */}
            { user.role === 1 ?
              <Route path={''} element={<Admin/>}>
                <Route path={'product-management'} element={<ProductManagement/>}/> {/* Trang quan ly san pham*/}
                <Route path={'product-edit/:id'} element={<ProductEdit/>}/>
                <Route path={'product-add'} element={<ProductAdd/>}/>
                <Route path={'order-management'} element={<OrderManagement/>}/> {/* Trang quan ly don hang*/}
                <Route path={'category-management'} element={<CategoryManagement/>}/> {/* Trang quan ly danh muc/ loai san pham*/}
                <Route path={'category-edit/:id'} element={<CategoryEdit/>}/>
                <Route path={'category-add'} element={<CategoryAdd/>}/>
                <Route path={'user-management'} element={<UserManagement/>}/> {/* Trang quan ly nguoi dung*/}
              </Route>:
              <>
             
              {/* Trang cua nguoi dung */}
            <Route path={''} element={<User/>}>  

            {/*  trang khong can dang nhap */}
            <Route path={''} element={<Home/>}/>  {/* Trang chu */}
            <Route path={'list-product'} element={<ListProduct/>}/>  {/* Trang danh sach san pham */}
            <Route path={'detail-product/:id'} element={<DetailProduct/>}/>  {/* Trang chi tiet san pham */}
            <Route path={'login'} element={<Login/>}/> 
            <Route path={'register'} element={<Register/>}/>

            {/* Trang phai dang nhap */}
            { user !== 'Username is not existed' && user !== 'Password is wrong' &&
            <>
              <Route path={'show-cart'} element={<ShowCart/>}/>  {/* Trang gio hang */}
              <Route path={'order-history'} element={<OrderHistory/>}/>  {/* Trang lich su don hang */}
              <Route path={'payment/:id'} element={<Payment/>}/> {/* Trang mua hang/ thanh toan*/}
              <Route path={'information'} element={<Information/>}/> {/* Trang thong tin nguoi dung*/}
              <Route path={'order-detail/:id'} element={<OrderDetail/>}/> {/* Trang chi ty don hang*/}
              <Route path={'changePw'} element={<ChangePw/>}/> {/* Trang doi pw*/}
            </>
            }
          </Route>
          </>
            }
          </Routes>
        </div>
      </>
  );
}

export default App;
