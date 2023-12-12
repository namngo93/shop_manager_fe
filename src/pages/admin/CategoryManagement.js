import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../services/categoryService";

export default function ManageCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => { 
        return  state.categories.categories
    });
    
    useEffect(()=>{
        dispatch(getCategory())
    },[]);
    
    return(
        <>

            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>List category</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="ALL" role="tabpanel">
                                        <div className="tab-single">
                                            <div className="row">
                                                <div className="col-12">
                                                    <table className="table table-striped" border={1}>
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">STT</th>
                                                            <th scope="col">Category Id</th>
                                                            <th scope="col">Name category</th>
                                                            <th scope="col" colSpan="2" style={{textAlign:"center"}}>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            categories.map((category,ind)=>(
                                                                <tr key = {category.categoryId}>
                                                                    <th scope="col">{ind+1}</th>
                                                                    <th scope="col">{category.categoryId}</th>
                                                                    <th scope="col">{category.categoryName}</th>
                                                                    <th scope="col" >
                                                                        <button 
                                                                            onClick={() => navigate(`/admin/category-edit/${category.categoryId}`)}
                                                                            className="btn btn-outline-primary"
                                                                            >
                                                                            Edit
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
        </>
    )
}