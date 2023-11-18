import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "../services/userService";
import {Field, Form, Formik} from "formik";
import swal from "sweetalert";
import './login.css'


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>{
        return state.user.currentUser
    })


    const handleLogin = async (values) =>{
        await dispatch(login(values)).then((e)=>{
            if(e.payload !== 'Username is not existed' && e.payload !== 'Password is wrong'){
                swal(`Well come, "${e.payload.username}"`, {
                    icon: "success",
                })
                navigate('/home')
            }else{
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        localStorage.clear()
    }, [])

    return(
        <>

                <div className="row" >
                    <div className="col-5" >
                        <div className="row" >
                            <div style={{marginTop:110}}>
                                <h1 style={{textAlign:'center', fontStyle:'Serif'}}>Login</h1>
                                <div style={{textAlign:"center"}}>
                                    <img style={{width:100}}  src="/images/logo3.png" alt=""/>
                                </div>

                                <Formik
                                    initialValues={{userName:'', password:''}}
                                    onSubmit={(values)=>{
                                        handleLogin(values).then()
                                    }}>
                                    <Form>
                                        <div className="row">

                                            <div className="mb-3" style={{width:300, margin:"auto"}}>
                                                <label htmlFor="exampleInput" className="form-label">Username</label>
                                                <Field  type="text" className="form-control" id="exampleInput" name={'userName'}/>
                                                {
                                                    user === 'Username is not existed' &&
                                                    <>
                                                        <h6 style={{color: "red"}}>Username is not existed</h6>
                                                    </>
                                                }
                                            </div>

                                            <div>

                                            </div>
                                            <div className="mb-3" style={{width:300,margin:"auto"}}>
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <Field type="password" className="form-control" id="exampleInputPassword1" name={'password'}/>
                                                {
                                                    user === 'Password is wrong' &&
                                                    <>
                                                        <h6 style={{color: "red"}}>Password is wrong</h6>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                                <div style={{textAlign:"center"}}>
                                                    <button type="submit" className="btn btn-primary"  >Login</button>
                                                    <Link to={'/register'} ><button style={{marginLeft:10}} type="submit" className="btn btn-secondary">register</button></Link>

                                                </div>
                                         </div>

                                    </Form>
                                </Formik>


                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <img style={{height:750}} src="/images/1234.jpg" alt=""/>
                    </div>
                </div>



        </>
    )
}