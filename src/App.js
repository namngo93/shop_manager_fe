
import './App.css';
import Login from "./pages/Login";
import {Route, Routes} from "react-router";
import Register from "./pages/Register";
import Admin from "./pages/home/Home";
import Home from "./pages/product/HomeProduct";
import {useSelector} from "react-redux";
import ProductList from "./pages/product/ProductList";
import ManagerProduct from "./components/admin/ManagerProduct";
import ShowCart from "./pages/product/ShowCart";
import FocusProduct from "./pages/product/FocusProduct";
import HistoryOrder from "./pages/product/PurchaseOrder";
import ManagerOrder from "./components/admin/ManagerOrder";
import BuyNow from "./pages/product/BuyNow";
import People from "./pages/product/People";
import TruocDangNhap from "./pages/product/TruocDangNhap";

function App() {
  // service -> slice -> store -> selector -> useEffect
  const user = useSelector(state=>{
    return state.user.currentUser
  })

  return (
      <>
        <div className="container-fluid">
       
          <Routes>
            <Route path={''} element={<TruocDangNhap/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'list-product'} element={<ProductList/>}/>
                <Route path={'focus-product'} element={<FocusProduct/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'register'} element={<Register/>}/>
            {
              user !== 'Username is not existed' && user !== 'Password is wrong' ?
                  <>
                      <Route path={'show-cart'} element={<ShowCart/>}/>
                      <Route path={'history-order/:idUser'} element={<HistoryOrder/>}/>
                      <Route path={'buy-now/:id'} element={<BuyNow/>}/>
                      <Route path={'people'} element={<People/>}/>
                  </>
                  :
                  <Route path={'login'} element={<Login/>}/>
                }
                </Route>
                {user.role === 1 &&
                <Route path={'admin'} element={<Admin/>}>
                   <Route path={'manager-product'} element={<ManagerProduct/>}/>
                   <Route path={'manager-order'} element={<ManagerOrder/>}/>
                   <Route path={'manager-category'} element={<ManagerOrder/>}/>
                   <Route path={'manager-user'} element={<ManagerOrder/>}/>
                  </Route>
                
              }

          </Routes>
        </div>
      </>
  );
}

export default App;
