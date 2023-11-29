import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import React from "react";
import { addCategory } from "../../services/categoryService";
import swal from "sweetalert";

export default function AddCategory() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <div className="mt-3 section-title">
                        <h2>Add Category</h2>
                    </div>
                    <div className="row">
                        <div className="mt-5 col-6">
                            <Formik
                            initialValues={{
                                categoryName: '',
                            }}
                            onSubmit={(values) => {
                                dispatch(addCategory(values)).then(()=>{

                                    swal("Added new category success!", {
                                        icon: "success",
                                    })
                                    navigate('/admin/category-management')

                                })
                            }}>
                            <Form>
                                <div style={{textAlign:"center"}}>
                                    <div className="mb-3" >
                                        <label htmlFor="exampleInput" className="form-label">Name Category</label>
                                        <Field style={{width:450}} type="text" className="form-control"  name={'categoryName'}/>
                                    </div>
                                    <button  type="submit" className="btn btn-outline-primary">Add</button>
                                </div>
                            </Form>
                         </Formik>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}