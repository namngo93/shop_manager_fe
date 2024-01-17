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
        let data = {...values};
        dispatch(addCategory(data)).then(()=>{

            swal("Thêm danh mục mới thành công!", {
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
                                <h2>Danh sách danh mục</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{marginTop:-40}}>
                            <div className="product-info">
                                <div className="nav-main" style={{marginBottom:20} }>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                       
                                    <li class="nav-item">
                                    <Button variant="primary" onClick={handleShow}>Thêm mới</Button>                                   
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
            <div style={{ margin: "auto", padding: "20px 50px", textAlign: "center" }} >
                <h1>Thêm danh mục</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInput" className="form-label">Tên danh mục</label>
                    <Field type="text" className="form-control"  name={'categoryName'}/>
                </div>
                <Button style={{ marginRight: 10,}}  variant="secondary" onClick={handleClose}>
                Đóng
                </Button>
                <Button type="submit" variant="primary">
                Thêm
                </Button>
            </div>
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
                                                    <table className="table table-striped" border={1} style={{textAlign: "center" }}>
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">STT</th>
                                                            <th scope="col">ID danh mục</th>
                                                            <th scope="col">Tên danh mục</th>
                                                            <th scope="col" colSpan="2" style={{textAlign:"center"}}>Hành động</th>
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
                                                                            Sửa
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