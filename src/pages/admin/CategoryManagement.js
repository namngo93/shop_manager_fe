import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory, addCategory } from "../../services/categoryService";
import {Field, Form, Formik} from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';


export default function ManageCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => { 
        return  state.categories.categories
    });
    
    useEffect(()=>{
        dispatch(getCategory())
    },[]);

    // add new cat
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async (values) => {
        console.log(values)
        let data = {...values};
        dispatch(addCategory(data)).then(()=>{

            swal("Added new product success!", {
                icon: "success",
            });
            dispatch(getCategory());
            setShow(false);
        });
    }
    
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
                                    <Button variant="primary" onClick={handleShow}>Add new</Button>                                   
                                    </li>
                                    </ul>
                                </div>
                                
                                <Modal show={show} onHide={handleClose}>
    <Formik
        initialValues={{ categoryName: '' }}
        onSubmit={(values) => {
            handleAdd(values)
        }}
        enableReinitialize={true}
    >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex mb-3">
                <div className="avatar avatar-xs me-2">
                    <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="#"/>
                </div>
            </div>
            <div>
                <div className="mb-3" >
                    <label htmlFor="exampleInput" className="form-label">Name Category</label>
                    <Field style={{width:450}} type="text" className="form-control"  name={'categoryName'}/>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add new
            </Button>
          </Modal.Footer>
        </Form>
    </Formik>
</Modal>

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
                                                                            onClick={() => navigate(`/category-edit/${category.categoryId}`)}
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