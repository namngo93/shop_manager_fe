import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import { editProduct, findByProductId } from "../../services/productService";
import {useEffect, useState} from "react";
import {storage} from "../../services/firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {getCategory} from "../../services/categoryService";
import swal from 'sweetalert';


export default function EditProduct() {
    const {id} = useParams();
    const product = useSelector(state => {
        return state.products.product
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const category = useSelector(state => {
        return state.categories.categories
    });
    
    const handleEdit = async (values) => {
        let newProduct = {...values};
        newProduct.image = urls[urls.length-1];
        delete newProduct.categoryName;
        dispatch(editProduct(newProduct));
        swal(`Edited ${newProduct.productName} success!`, {
            icon: "success",
        });
        navigate('/admin/product-management')
    }
    
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        dispatch(getCategory())
    }, []);

    useEffect(() => {
        dispatch(findByProductId(id));
    }, [])

    useEffect(() => {
        setUrls([product.image])
    }, []);
    
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

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign: 'center'}}>Edit product</h1>
                    <Formik
                        initialValues={
                            product
                        }
                        onSubmit={(values) => {
                            handleEdit(values)
                        }}
                        enableReinitialize={true}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Name product</label>
                                <Field type="text" className="form-control" name={'productName'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Description</label>
                                <Field type="text" className="form-control" name={'description'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Price</label>
                                <Field type="number" className="form-control" name={'price'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Quantity</label>
                                <Field type="number" className="form-control" name={'inventory'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Image</label>
                                <br/>

                                <input type='file' id="fileInput" hidden  onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-primary" style={{marginRight: 10}} type='button'
                                        onClick={() => document.getElementById('fileInput').click()}>Upload
                                </button>
                                {urls.length > 1 ?
                                <img src={urls[urls.length-1]} alt={urls[urls.length-1]} style={{width: 50}}/>:
                                <img src={product.image} alt={product.image} style={{width: 50}}/>
                                }
                            </div>
                            <div className="mb-3">
                                <Field as='select' name={'categoryId'} >
                                    {category !== undefined && category.map((item) => (
                                        <option key = {item.categoryId} value={item.categoryId}>{item.categoryName}</option>
                                    ))
                                    }
                                </Field>
                            </div>
                            <button type="submit" className="btn btn-outline-primary primary">Save</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <br/>
        </>
    )
}