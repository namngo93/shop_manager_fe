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
                    <div className="col-12" style={{marginTop:-40}}>
                            <div className="product-info">
                                <div className="nav-main" style={{marginBottom:20} }>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                       
                                    <li class="nav-item">
                                         <a class="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal" data-bs-target="#feedActionVideo"> <i class="bi bi-camera-reels-fill text-info pe-2"></i>add</a>
                                    </li>
                                      

                                    </ul>
                                </div>
                                
                                    <div class="modal fade" id="feedActionVideo" tabindex="-1" aria-labelledby="feedActionVideoLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="feedActionVideoLabel">Add post video</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="d-flex mb-3">
                                                        <div class="avatar avatar-xs me-2">
                                                            <img class="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt=""/>
                                                        </div>
                                                 <form class="w-100">
                                                    <textarea class="form-control pe-4 fs-3 lh-1 border-0" rows="2" placeholder="Share your thoughts..."></textarea>
                                                </form>
                                                </div>

                                        <div>
                                            <label class="form-label">Upload attachment</label>
                                            <div class="dropzone dropzone-default card shadow-none" data-dropzone='{"maxFiles":2}'>
                                                <div class="dz-message">
                                                     <i class="bi bi-camera-reels display-3"></i>
                                                    <p>Drag here or click to upload video.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger-soft me-2"><i class="bi bi-camera-video-fill pe-1"></i> Live video</button>
                                        <button type="button" class="btn btn-success-soft">Post</button>
                                                    </div>
                                              </div>
                                         </div>
                                    </div>
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
        </>
    )
}