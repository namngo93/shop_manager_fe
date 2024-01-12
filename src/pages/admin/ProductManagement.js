import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState,} from "react";
import {deleteProduct, findByConditions, addProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import {getCategory} from "../../services/categoryService";
import {Field, Form, Formik} from "formik";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../services/firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ManageProduct(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => { 
        return  state.categories.categories
    });

    const products = useSelector(state => {
        return   state.products.products
    });

    const [condition, setCondition] = useState({productName:'', categoryId:''});
    

    const  handleDelete =  (productId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteProduct(productId))
                    .then((e) => {
                        if(e.type !== "products/deleteProduct/rejected"){
                            swal(`Poof! Deleted!`, {
                                icon: "success",
                            })
                        } else {
                            swal(`Server error`, {
                                icon: "warning",
                            })
                        }
                    })
                    
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }   
    
    useEffect(()=>{
        dispatch(getCategory())
    },[categories, dispatch]);

    useEffect(() => {
        dispatch(findByConditions(condition))
    }, [condition, dispatch]);

    // add new product
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async (values) => {
        console.log(values)
        let data = {...values};
        dispatch(addProduct(data)).then(()=>{

            swal("Added new product success!", {
                icon: "success",
            });
            dispatch(findByConditions(condition));
            setShow(false);
            setUrls([]);
        });
    }

    const [urls, setUrls] = useState([]);

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const files = Array.from(e.target.files);  // danh sách các ảnh đuợc chọn
        const promises = [];                        // danh sách các task upload ảnh
      
        files.forEach((file) => {
          const uniqueId = Math.random();
          const storageRef = ref(storage, `images/${uniqueId}_${file.name}`);  // tạo 1 file và lấy đường dẫn trên firebase
          const uploadTask = uploadBytesResumable(storageRef, file); // upload file/ảnh lên firebase
      
          const promise = new Promise((resolve, reject) => { // lấy url và push  vào mảng promises 
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              (error) => {
                reject(error);
              },
              async () => {
                try {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(url);
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
      
          promises.push(promise);
        });
      
        Promise.all(promises) // xử lý đồng các promise và lấy ra danh sách url
          .then((urls) => {
            // Xử lý các URL sau khi upload hoàn tất
            // Cập nhật state hoặc thực hiện các công việc khác ở đây
            setUrls(prev => [...prev, urls]); 
            alert("All images uploaded:");
          })
          .catch((error) => {
            // Xử lý lỗi nếu có
            alert("Error uploading images:", error);
            // Hiển thị thông báo lỗi hoặc thực hiện xử lý khác
          });
    };
    
    return(
        <>

            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12" style={{marginTop:-60}}>
                            <div className="section-title">
                                <h2>List product</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" style={{marginTop:-40}}>
                            <div className="product-info">
                                <div className="nav-main" style={{marginBottom:20} }>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li>
                                                <input className="form-label"  name="search" placeholder="Search Products Here....." type="search" 
                                                onChange={(e)=>{
                                                    setCondition(prevState => ({
                                                        ...prevState,
                                                        productName: e.target.value
                                                    }))
                                            }}/>
                                        </li>
                                        <li class="nav-item">
                                        <Button variant="primary" onClick={handleShow}>Add new</Button>
                                        </li>
                                        <li className="nav-item ">
                                            <button className="btn btn-outline-secondary my-2 my-sm-0" 
                                                onClick={()=>{
                                                    setCondition(prevState => ({
                                                        ...prevState, 
                                                        categoryId: '', 
                                                        }));
                                                    dispatch(findByConditions(condition))
                                                }} >All</button>
                                        </li>

                                        {categories.map((category)=>(
                                            <li key = {category.categoryId}  className="nav-item">
                                                <button style={{height:30,fontSize:10,width:80}} className=" ml-3  btn btn-outline-secondary my-2 my-sm-0" 
                                                    onClick={()=>{
                                                        setCondition(prevState => ({
                                                            ...prevState, 
                                                            categoryId: category.categoryId, 
                                                            }))
                                                    }}>{category.categoryName}</button>
                                            </li>
                                        ))}

                                    </ul>
                                </div>

{/* modal add product */}
<Modal show={show} onHide={handleClose}>
    <Formik
        initialValues={{
                            productName: '',
                            price: '',
                            description: '',
                            inventory:'',
                            catgoryId: ''
                        }}
        onSubmit={(values) => {
            values.image = urls[0]
            handleAdd(values)
        }}
        enableReinitialize={true}
    >
        <Form>
          <Modal.Body>
            <h1>Add product</h1>
         

                        <div >
                        <div className="mb-3" style={{marginLeft: 60}}>
                            <label htmlFor="productName" className="form-label">Name product</label>
                            <Field id = "productName" type="text" className="form-control" style= {{width:300}} name={'productName'}/>
                        </div>
                        <div className="mb-3" style={{marginLeft: 60}}>
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field id = "price" type="number" className="form-control" style= {{width:300}} name={'price'}/>
                        </div>
                        <div className="mb-3"style={{marginLeft: 60}}>
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field id = "description" type="text" className="form-control" style= {{width:300}} name={'description'}/>
                        </div>
                        <div className="mb-3" style={{marginLeft: 60}}>
                            <label htmlFor="inventory" className="form-label">Quantity</label>
                            <Field type="number" className="form-control" id="inventory" style= {{width:300}} name={'inventory'}/>
                        </div>
                        <div className="mb-3" style={{marginLeft: 60}}>
                                <label htmlFor="exampleInput" className="form-label">Image</label>
                                <br/>

                                <input type='file' id="fileInput" hidden  onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-primary" style={{marginRight: 10}} type='button'
                                        onClick={() => document.getElementById('fileInput').click()}>Upload
                                </button>
                                {urls.map((item,ind) => (
                                        <img key={ind} src={item} alt="" style={{width: 50}}/>
                                ))}
                                {/* {urls.length > 1 ?
                                <img src={urls[urls.length-1]} alt={urls[urls.length-1]} style={{width: 50}}/>:
                                <img src={product.image} alt={product.image} style={{width: 50}}/>
                                } */}
                            </div>
                        <div className="mb-3" style={{marginLeft: 60}}>
                            <Field as='select' name={'categoryId'} >
                                {categories !== undefined && categories.map((item)=>(
                                    <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
                                ))

                                }
                            </Field>
                        </div>
                        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add new
            </Button>
          </Modal.Footer>
        </Form>
    </Formik>
</Modal>

{/* modal end */}
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="ALL" role="tabpanel">
                                        <div className="tab-single">
                                            <div className="row">
                                                <div className="col-12">
                                                    <table className="table table-striped" border={1}>
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">STT</th>
                                                            <th scope="col">Product Id</th>
                                                            <th scope="col">Product name</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Image</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">Quantity</th>
                                                            <th scope="col" colSpan="2" style={{textAlign:"center"}}>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            products.map((product,ind)=>(
                                                                <tr key = {product.productId}>
                                                                    <th scope="col">{ind+1}</th>
                                                                    <th scope="col">{product.productId}</th>
                                                                    <th scope="col">{product.productName}</th>
                                                                    <th scope="col">{product.description}</th>
                                                                    <th scope="col"><img src={product.image} style={{width:50}} alt="#"/></th>
                                                                    <th scope="col">{product.price}</th>
                                                                    <th scope="col">{product.categoryName}</th>
                                                                    <th scope="col">{product.inventory}</th>
                                                                    <th scope="col" >
                                                                        <button 
                                                                            onClick={() => {
                                                                                navigate(`/product-edit/${product.productId}`)}}
                                                                            className="btn btn-outline-primary"
                                                                            >
                                                                            Edit
                                                                        </button>   
                                                                        <button  className="btn btn-outline-danger" 
                                                                            onClick={() => {handleDelete(product.productId)}}
                                                                            >
                                                                            Delete
                                                                        </button>
                                                                    </th>
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

