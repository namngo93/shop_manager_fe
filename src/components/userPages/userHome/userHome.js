// import {Outlet} from "react-router";
import UserNavbar from "../userNavbar";
import UserFooter from "../userFooter";
import { Link } from "react-router-dom";

// import userNavbar from "../userNavbar";
export default function TruocDangNhap(){
    return(
        <>
          <UserNavbar/>

            <div className="row">
                <div className="col-12">
                  <Link to={"/login"}>Login</Link>
                </div>
            </div>

            <UserFooter/>
        </>
    )
}