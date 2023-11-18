import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {Outlet} from "react-router";

export default function Home(){
    return(
        <>
          <Navbar/>

            <div className="row">
                <div className="col-12">
                    <Outlet ></Outlet>
                </div>
            </div>

            <Footer/>
        </>
    )
}