import {Field, Form, Formik} from "formik";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { editUserInfo } from "../../services/userService";

export default function Information(){
    const dispatch = useDispatch();
    const user = useSelector(state =>{
        return   state.user.currentUser
        }
    );
    
    const handleSaveInfo = (values) => {
        const data = {
            userId: values.userId,
            userName: values.userName,
            birthDay: values.birthDay,
            email: values.email,
            phone: values.phone,
            address: values.address,
            role: values.role,
        };
        dispatch(editUserInfo(data));
        alert("Successful")
    }
    return(
        <>
          <div className="mt-3 section-title">
            <h2>Information</h2>
        </div>
        <Formik
            initialValues={user}
            onSubmit={(values)=>handleSaveInfo(values)}>
            <Form>
                <div className="mb-3 row">
                    <div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="userName" className="form-label" >User name</label>
                            <Field type="text" className="form-control" id="userName" name={'userName'} readOnly/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="birthDay" className="form-label">Birthday</label>
                            <Field type="date" className="form-control" id="birthDay" name={'birthDay'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="text" className="form-control" id="email" name={'email'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <Field type="text" className="form-control" id="phone" name={'phone'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="address" className="form-label">Address</label>
                            <Field type="text" className="form-control" id="address" name={'address'}/>
                        </div>
                        <div style={{marginBottom:3, textAlign:"center"}}>
                            <button type="submit" style={{width: 200}}
                                    className="mt-3 btn btn-outline-danger">Save
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
        </>
    )
}