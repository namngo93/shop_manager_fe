import {Field, Form, Formik, ErrorMessage} from "formik";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { changePw } from "../../services/userService";
import * as Yup from "yup";

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
            alert(e.payload);
            resetForm();
        });
    };

    const validateSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Too Short! Password must be longer than 6 characters")
            .max(50, "Too Long!")
            .required("Required"),
            rePw: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Required"),
    })
    return(
        <>
          <div className="mt-3 section-title">
            <h2>Change password</h2>
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
                            <label htmlFor="password" className="form-label">New password</label>
                            <Field type="password" className="form-control" id="password" name={'password'}/>
                            <h6 style={{color: "red"}}><ErrorMessage name={'password'} ></ErrorMessage></h6>
                        </div>
                        <div className="mb-3" style={{width:350,margin:"auto"}}>
                            <label htmlFor="rePw" className="form-label">Repeat password</label>
                            <Field type="password" className="form-control" id="rePw" name={'rePw'}/>
                            <h6 style={{color: "red"}}><ErrorMessage name={'rePw'} ></ErrorMessage></h6>
                        </div>
                        <div style={{marginBottom:3, textAlign:"center"}}>
                            <button type="submit" style={{width: 200}}
                                    className="mt-3 btn btn-outline-danger">Change
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