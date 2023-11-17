import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {addCategory, getCategory} from "../../services/categoruService";
import swal from "sweetalert";
import button from "bootstrap/js/src/button";
import {deleteProduct} from "../../services/productsService";



export default function AddCategory() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const category = useSelector(state =>{
        return state.categories.category
    })


    useEffect(()=>{
        dispatch(getCategory())
    },[]);



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
                                name: '',
                            }}
                            onSubmit={(values) => {
                                dispatch(addCategory(values)).then(()=>{

                                    swal("Added new category success!", {
                                        icon: "success",
                                    })
                                    navigate('/home/add-category')

                                })
                            }}>
                            <Form>

                                <div style={{textAlign:"center"}}>
                                    <div className="mb-3" >
                                        <label htmlFor="exampleInput" className="form-label">Name Category</label>
                                        <Field style={{width:450}} type="text" className="form-control"  name={'name'}/>
                                    </div>
                                    <button  type="submit" className="btn btn-outline-primary">Add</button>
                                </div>
                            </Form>
                         </Formik>
                        </div>
                        <div className="col-6">
                            {/*list Category*/}
                            <div className="row" id="table1">
                                <div className="col-12">
                                    <div className="shopping-cart section">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <table className="table shopping-summery" style={{width:400}}>
                                                        <thead>
                                                        <tr className='.bg-secondary'>
                                                            <th scope="col">STT</th>
                                                            <th scope="col">Name Category</th>
                                                        </tr>
                                                        </thead>
                                                        {category.map((product,ind)=>(

                                                            <tr>
                                                                <th scope="col">{ind+1}</th>
                                                                <th scope="col">{product.name}</th>
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

        </>
    )
}