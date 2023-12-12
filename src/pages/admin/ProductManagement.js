import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteProduct, findByConditions } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import {getCategory} from "../../services/categoryService";

export default function ManageProduct(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => { 
        return  state.categories.categories
    });

    const products = useSelector(state => {
        return   state.products.products
    });

    const [condition, setCondition] = useState({productName:'', categoryId:''});
    

    const  handleDelete =  (productId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteProduct(productId))
                    .then((e) => {
                        if(e.type !== "products/deleteProduct/rejected"){
                            swal(`Poof! Deleted!`, {
                                icon: "success",
                            })
                        } else {
                            swal(`Server error`, {
                                icon: "warning",
                            })
                        }
                    })
                    
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }   
    
    useEffect(()=>{
        dispatch(getCategory())
    },[categories, dispatch]);

    useEffect(() => {
        dispatch(findByConditions(condition))
    }, [condition, dispatch]);
    
    return(
        <>

            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>List product</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main" style={{marginBottom:20} }>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li>
                                                <input name="search" placeholder="Search Products Here....." type="search" 
                                                onChange={(e)=>{
                                                    setCondition(prevState => ({
                                                        ...prevState,
                                                        productName: e.target.value
                                                    }))
                                            }}/>
                                        </li>
                                        <li className="nav-item ">
                                            <button className="btn btn-outline-secondary my-2 my-sm-0" 
                                                onClick={()=>{
                                                    setCondition(prevState => ({
                                                        ...prevState, 
                                                        categoryId: '', 
                                                        }));
                                                    dispatch(findByConditions(condition))
                                                }} >All</button>
                                        </li>

                                        {categories.map((category)=>(
                                            <li key = {category.categoryId}  className="nav-item">
                                                <button style={{height:30,fontSize:10,width:80}} className=" ml-3  btn btn-outline-secondary my-2 my-sm-0" 
                                                    onClick={()=>{
                                                        setCondition(prevState => ({
                                                            ...prevState, 
                                                            categoryId: category.categoryId, 
                                                            }))
                                                    }}>{category.categoryName}</button>
                                            </li>
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
                                                            <th scope="col">Product Id</th>
                                                            <th scope="col">Product name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Image</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col" colSpan="2" style={{textAlign:"center"}}>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            products.map((product,ind)=>(
                                                                <tr key = {product.productId}>
                                                                    <th scope="col">{ind+1}</th>
                                                                    <th scope="col">{product.productId}</th>
                                                                    <th scope="col">{product.productName}</th>
                                                                    <th scope="col">{product.description}</th>
                                                                    <th scope="col"><img src={product.image} style={{width:50}} alt="#"/></th>
                                                                    <th scope="col">{product.price}</th>
                                                                    <th scope="col">{product.categoryName}</th>
                                                                    <th scope="col">{product.inventory}</th>
                                                                    <th scope="col" >
                                                                        <button 
                                                                            onClick={() => {
                                                                                navigate(`/admin/product-edit/${product.productId}`)}}
                                                                            className="btn btn-outline-primary"
                                                                            >
                                                                            Edit
                                                                        </button>   
                                                                        <button  className="btn btn-outline-danger" 
                                                                            onClick={() => {handleDelete(product.productId)}}
                                                                            >
                                                                            Delete
                                                                        </button>
                                                                    </th>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
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