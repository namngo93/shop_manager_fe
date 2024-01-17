import {Field, Form, Formik} from "formik";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { editUserInfo } from "../../services/userService";
import swal from "sweetalert";
import { Link } from 'react-router-dom';

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
        swal("Thành công!", {
            icon: "success",
        })
    }
    return(
        <>
        <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Trang chủ<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="">Thông tin</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <div className="mt-3 section-title">
            <h2>Thông tin</h2>
        </div>
        <Formik
            initialValues={user}
            onSubmit={(values)=>handleSaveInfo(values)}>
            <Form>
                <div className="mb-3 row">
                    <div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="userName" className="form-label" >Tên tài khoản</label>
                            <Field type="text" className="form-control" id="userName" name={'userName'} readOnly/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="birthDay" className="form-label">Ngày sinh</label>
                            <Field type="date" className="form-control" id="birthDay" name={'birthDay'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="text" className="form-control" id="email" name={'email'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                            <Field type="text" className="form-control" id="phone" name={'phone'}/>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <Field type="text" className="form-control" id="address" name={'address'}/>
                        </div>
                        <div style={{marginBottom:3, textAlign:"center"}}>
                            <button type="submit" style={{width: 200}}
                                    className="mt-3 btn btn-outline-danger">Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
        </>
    )
}