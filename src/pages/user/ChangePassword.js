import {Field, Form, Formik, ErrorMessage} from "formik";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { changePw } from "../../services/userService";
import * as Yup from "yup";
import swal from "sweetalert";
import { Link } from "react-router-dom";


export default function ChangePassword(){
    const dispatch = useDispatch();

    const user = useSelector(state =>{
        return   state.user.currentUser
        }
    );
    
    const handleChangePw = (values, resetForm) => {
        const data = {
            userId: user.userId,
            password: values.password
        };
        dispatch(changePw(data))
        .then((e) => {
            swal("Thành công!", {
                icon: "success",
            });
            resetForm();
        });
    };

    const validateSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Quá ngắn! Mật khẩu phải dài hơn 6 ký tự")
            .max(50, "Quá dài! Mật khẩu phải ngắn hơn 50 ký tự")
            .required("Bắt buộc"),
            rePw: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
            .required("Bắt buộcd"),
    })
    return(
        <>
        <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Trang chủ<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="">Đổi mật khẩu</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <div className="mt-3 section-title">
            <h2>Đổi mật khẩu</h2>
        </div>
        <Formik
            initialValues={{password: '',rePw: ''}}

            validationSchema={validateSchema}

            onSubmit={(values, {resetForm})=>handleChangePw(values, resetForm)}
            // enableReinitialize={true} khi props không thay đổi thì  enableReinitialize không có tác dụng
            // thay vào đó dùng resetForm của formik
            >
            {() =>(
             <Form>
                <div className="mb-3 row">
                    <div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="password" className="form-label">Mật khẩu mới</label>
                            <Field type="password" className="form-control" id="password" name={'password'}/>
                            <h6 style={{color: "red"}}><ErrorMessage name={'password'} ></ErrorMessage></h6>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="rePw" className="form-label">Lặp lại mật khẩu</label>
                            <Field type="password" className="form-control" id="rePw" name={'rePw'}/>
                            <h6 style={{color: "red"}}><ErrorMessage name={'rePw'} ></ErrorMessage></h6>
                        </div>
                        <div style={{marginBottom:3, textAlign:"center"}}>
                            <button type="submit" style={{width: 200}}
                                    className="mt-3 btn btn-outline-danger">Đổi
                            </button>
                        </div>
                    </div>
                </div>
            </Form>   
            )}
            
        </Formik>
        </>
    )
}