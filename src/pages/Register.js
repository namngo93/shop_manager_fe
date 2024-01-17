import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {register, sendOTP, checkUsernameExist} from "../services/userService";
import {useState} from "react";
import swal from 'sweetalert';
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Register() {

    const validateSchema = Yup.object().shape({
        userName: Yup.string()
            .min(6, "Quá ngắn! Tên tài khoản phải dài hơn 6 ký tự")
            .max(50, "Quá dài! Tên tài khoản nhỏ hơn 50 ký tự")
            .required("Bắt buộc"),
        password: Yup.string()
            .min(6, "Quá ngắn! Tên tài khoản phải dài hơn 6 ký tự")
            .max(50, "Quá dài! Tên tài khoản nhỏ hơn 50 ký tự")
            .required("Bắt buộc"),
        email: Yup.string()
            .required("Bắt buộc")
            .email("Email không hợp lệ"),
    })
    const validateOTPSchema = Yup.object().shape({
        otp: Yup.string().required("Bắt buộc").length(6, "Mã OTP gồm 6 ký tự")
      });


    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [check,setCheck] = useState([])

    const [data, setData] = useState({
            "userName": '',
            "password": '',
            "birthDay": "2023-11-12",
            "email": '',
            "phone": "0981641139",
            "address": "Hai Duong",
    })

    const handleRegister = (values)=>{
        values.user = data;
        dispatch(register(values)).then((e)=>{
            if(e.payload !== 'Username registered'){
                swal("Đăng ký thành công!", {
                    icon: "success",
                });
                navigate('/login')
            }else {
                setCheck(1)
            }

        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sendOTPRegister = (values)=>{
        dispatch(checkUsernameExist( {userName: values.userName})).then((event) => {
            if(event.payload === "Username is existed"){
                setCheck(1)
            } else {

                handleShow();
                setData({
                    ...data,
                    "userName": values.userName,
                    "password": values.password,
                    "email": values.email,
                })
                dispatch(sendOTP({email: values.email}))
                .then((e)=>{
                    if(e.payload.message && e.payload.message === "OTP Sent Successfully"){
                        handleShow();
                    } else {
                        swal("Email không tồn tại!", {
                            icon: "success",
                        });
                    }
        
                })
            }
        })
    }
    return(
        <>
            <div className="row" >
                <div className="col-5" >
                    <div className="row" >
                        <div style={{marginTop:110}}>
                            <h1 style={{textAlign:'center', fontStyle:'Serif'}}>Register</h1>
                            <div style={{textAlign:"center"}}>
                                <img style={{width:100}}  src="/images/logo3.png" alt=""/>
                            </div>

                            <Formik
                                initialValues={{
                                    userName: data.userName,
                                    password: data.password,
                                    email: data.email,
                                }}
                                validationSchema={validateSchema}
                                onSubmit={(values)=>{sendOTPRegister(values)}}>
                                <Form>
                                    <div className="row" style={{ padding: "0 50px" }}>
                                        <div className="mb-3 custom-input-container">
                                            <label htmlFor="exampleInput" className="form-label">Tài khoản</label>
                                            <Field type="text" className="form-control" id="exampleInput" name={'userName'}/>
                                            <h6 style={{ color: "red" }}><ErrorMessage name={'userName'}></ErrorMessage></h6>
                                            {check === 1 &&
                                                <h6 style={{ color: "red" }}>Tài khoản đã tồn tại!</h6>}
                                        </div>
                                        <div className="mb-3 custom-input-container">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu</label>
                                            <Field type="password" className="form-control" id="exampleInputPassword1" name={'password'}/>
                                            <h6 style={{ color: "red" }}><ErrorMessage name={'password'}></ErrorMessage></h6>
                                        </div>
                                        <div className="mb-3 custom-input-container">
                                            <label>Email</label>
                                            <Field type="email" name="email" className="form-control" />
                                            <h6 style={{ color: "red" }}><ErrorMessage name={'email'}></ErrorMessage></h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div style={{textAlign:"center"}}>
                                            <button type="submit" className="btn btn-warning"  >Đăng ký</button>
                                            <Link to={'/login'} ><button style={{marginLeft:10}} type="submit" className="btn btn-secondary"> Quay lại đăng nhập</button></Link>

                                        </div>
                                    </div>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <img style={{width:'100%',height:'100%'}} src="/images/CHANEL-ALURE-HOME-SPORT-02.jpg" alt=""/>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Formik
                    initialValues={{ otp: '' }}
                    validationSchema={validateOTPSchema}
                    onSubmit={(values) => {
                        handleRegister( values)
                    }}
                    enableReinitialize={true}
                >
                    <Form>
                        <div style={{ margin: "auto", padding: "20px 50px", textAlign: "center" }}>
                            <h2 style={{ width: "100%" }}>Xác nhận email</h2>
                            <div className="mb-3" style={{ width: "100%" }}>
                                <label>Hãy nhập mã xác nhận OTP trong Gmail: {data.email}</label>  
                                <Field name="otp" className="form-control" autoFocus/>
                                <h6 style={{ color: "red" }}><ErrorMessage name={'otp'}></ErrorMessage></h6>
                            </div>
                            <Button style={{ marginRight: "10px" }} variant="secondary" onClick={handleClose}>
                            Đóng
                            </Button>
                            <Button type="submit" variant="primary">
                            Gửi
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}