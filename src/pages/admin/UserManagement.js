import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../services/userService";

export default function ManageUser(){
    const dispatch = useDispatch();
    const users = useSelector(state =>{
        return state.user.users
    });

    useEffect(()=>{
        dispatch(getUsers())
    },[]);
    
    return(
        <>

            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Danh sách người dùng</h2>
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
                                                            <th scope="col">ID người dùng</th>
                                                            <th scope="col">Tên người dùng</th>
                                                            <th scope="col">Ngày sinh</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Số điện thoại</th>
                                                            <th scope="col">Địa chỉ</th>
                                                            <th scope="col">Vai trò</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {users.map((user,ind)=>(
                                                            <tr key = {user.userId}>
                                                                <th scope="col">{ind+1}</th>
                                                                <th scope="col">{user.userId}</th>
                                                                <th scope="col">{user.userName}</th>
                                                                <th scope="col">{user.birthDay}</th>
                                                                <th scope="col">{user.email}</th>
                                                                <th scope="col">{user.phone}</th>
                                                                <th scope="col">{user.address}</th>
                                                                <th scope="col">{user.role}</th>
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
            </div>


            <br/>
            <br/>
        </>
    )
}