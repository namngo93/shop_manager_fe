
import './App.css';
import Login from "./pages/Login";
import {Route, Routes} from "react-router";
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import HomeProduct from "./pages/product/HomeProduct";
import AddProduct from "./pages/product/AddProduct";
import {useSelector} from "react-redux";
import EditProduct from "./pages/product/EditProduct";
import ProductList from "./pages/product/ProductList";
import ManagerProduct from "./pages/product/ManagerProduct";
import ShowCart from "./pages/product/ShowCart";
import FocusProduct from "./pages/product/FocusProduct";
import AddCategory from "./pages/product/AddCategory";
import PurchaseOrder from "./pages/product/PurchaseOrder";
import ManagerOrder from "./pages/product/ManagerOrder";
import BuyNow from "./pages/product/BuyNow";
import People from "./pages/product/People";
import UserHome from './components/userPages/userHome/userHome';

function App() {
  // service -> slice -> store -> selector -> useEffect
  const user = useSelector(state=>{
    return state.user.currentUser
  })

  return (
      <>
        <div className="container-fluid">
       
          <Routes>
            <Route path={''} element={<UserHome/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
            {
              user !== 'Username is not existed' && user !== 'Password is wrong'?
                  <Route path={'home'} element={<Home/>}>
                      <Route path={''} element={<HomeProduct/>}/>
                      <Route path={'manager-product'} element={<ManagerProduct/>}/>
                      <Route path={'manager-order'} element={<ManagerOrder/>}/>
                      <Route path={'add-product'} element={<AddProduct/>}/>
                      <Route path={'add-category'} element={<AddCategory/>}/>
                      <Route path={'my-product'} element={<ProductList/>}/>
                      <Route path={'edit-product/:id'} element={<EditProduct/>}/>
                      <Route path={'focus-product/:id'} element={<FocusProduct/>}/>
                      <Route path={'show-cart/:idOrder'} element={<ShowCart/>}/>
                      <Route path={'purchase-order/:idUser'} element={<PurchaseOrder/>}/>
                      <Route path={'buy-now/:id'} element={<BuyNow/>}/>
                      <Route path={'people'} element={<People/>}/>
                  </Route>:
                  <Route path={''} element={<Login/>}/>
            }

          </Routes>
        </div>
      </>
  );
}

export default App;
