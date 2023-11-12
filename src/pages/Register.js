import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {register} from "../services/userService";
import {useState} from "react";
import swal from 'sweetalert';
import * as Yup from "yup";
import {addOrder} from "../services/orderService";


export default function Register() {

    const validateSchema = Yup.object().shape({
        username: Yup.string()
            .min(6, "Too Short! Username must be longer than 6 characters")
            .max(50, "Too Long!")
            .required("Required"),
        password: Yup.string()
            .min(6, "Too Short! Password must be longer than 6 characters")
            .max(50, "Too Long!")
            .required("Required"),
    })


    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [check,setCheck] = useState([])

    const handleRegister = (values)=>{
        dispatch(register(values)).then((e)=>{
            if(e.payload !== 'Username registered'){
                swal("Register Success!", {
                    icon: "success",
                });
                let order = {
                    idUser: e.payload.id,
                    receiver: e.payload.username,
                    address: 'hd',
                    phone: 0,
                    time: '2023-02-24 00:29:52',
                    totalPoint: 0,
                    status: 'buying'
                }
                dispatch(addOrder(order))

                navigate('/')
            }else {
                setCheck(1)
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
                                    username: '',
                                    password: ''
                                }}
                                validationSchema={validateSchema}
                                onSubmit={(values)=>{handleRegister(values)}}>
                                <Form>
                                    <div className="row">

                                        <div className="mb-3" style={{width:300, margin:"auto"}}>
                                            <label htmlFor="exampleInput" className="form-label">Username</label>
                                            <Field type="text" className="form-control" id="exampleInput" name={'username'}/>
                                            <h6 style={{color: "red"}}><ErrorMessage name={'username'} ></ErrorMessage></h6>
                                            { check === 1 &&
                                                <>
                                                    <h6 style={{color: "red"}}>Username registered!</h6></>}
                                        </div>

                                        <div>

                                        </div>
                                        <div className="mb-3" style={{width:300,margin:"auto"}}>
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <Field type="password" className="form-control" id="exampleInputPassword1" name={'password'}/>
                                            <h6 style={{color:"red"}}><ErrorMessage name={'password'}></ErrorMessage></h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div style={{textAlign:"center"}}>
                                            <button type="submit" className="btn btn-warning"  >Register</button>
                                            <Link to={'/'} ><button style={{marginLeft:10}} type="submit" className="btn btn-secondary"> Back to Login</button></Link>

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


        </>
    )
}