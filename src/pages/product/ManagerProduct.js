import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteProduct, findByName, getProducts} from "../../services/productsService";
import {Link, useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import button from "bootstrap/js/src/button";
import {getCategory} from "../../services/categoruService";




export default function ManagerProduct(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => {
        return   state.products.products
    })
    useEffect(()=>{
        dispatch(getProducts()).then(()=>{
        })
    },[]);

    const categories = useSelector(state => {
        return   state.categories.category
    })

    useEffect(()=>{
        dispatch(getCategory()).then(()=>{
        })
    },[]);

    return(
        <>

            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>List Products</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main" style={{marginBottom:20}}>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">

                                        <li className="nav-item"><button className="btn btn-outline-secondary my-2 my-sm-0" onClick={()=>{
                                            dispatch(getProducts())
                                        }} >All</button></li>

                                        {categories.map((category)=>(
                                            <li  className="nav-item"><button style={{height:30,fontSize:10,width:80}} className=" ml-3  btn btn-outline-secondary my-2 my-sm-0" onClick={()=>{
                                                dispatch(findByName(category.name))
                                            }} >{category.name}</button></li>
                                        ))}

                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="ALL" role="tabpanel">
                                        <div className="tab-single">
                                            <div className="row">
                                                <div className="col-12">
                                                    <table className="table table-striped" border={1}>
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">STT</th>
                                                            <th scope="col">Name product</th>
                                                            <th scope="col">Description</th>
                                                            <th scope={"col"}>Image</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col" colSpan="2" style={{textAlign:"center"}}>Action</th>
                                                        </tr>
                                                        </thead>
                                                        {
                                                            products.map((product,ind)=>(
                                                                <tr>
                                                                    <th scope="col">{ind+1}</th>
                                                                    <th scope="col">{product.name}</th>
                                                                    <th scope="col">{product.description}</th>
                                                                    <th scope={"col"}><img src={product.image} style={{width:50}} alt=""/></th>
                                                                    <th scope="col">{product.price}</th>
                                                                    <th scope="col">{product.nameCategory}</th>
                                                                    <th scope="col">{product.totalQuantity}</th>
                                                                    <th scope="col" >
                                                                        <Link to={`/home/edit-product/${product.id}`}><button className="btn btn-outline-primary">Edit</button></Link>
                                                                        <button  className="btn btn-outline-danger" onClick={()=>{
                                                                            swal({
                                                                                title: "Are you sure?",
                                                                                text: "Once deleted, you will not be able to recover this imaginary file!",
                                                                                icon: "warning",
                                                                                buttons: true,
                                                                                dangerMode: true,
                                                                            })
                                                                                .then((willDelete) => {
                                                                                    if (willDelete) {
                                                                                        dispatch(deleteProduct(product.id))
                                                                                        swal(`Poof! Deleted ${product.name}!`, {
                                                                                            icon: "success",
                                                                                        })
                                                                                        // navigate('/home/manager-product')
                                                                                        ;
                                                                                    } else {
                                                                                        swal("Your imaginary file is safe!");
                                                                                    }
                                                                                });
                                                                        }}>Delete</button>
                                                                    </th>
                                                                </tr>
                                                            ))
                                                        }
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <br/>
            <br/>
        </>
    )
}