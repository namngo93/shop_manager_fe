import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {addProduct} from "../../services/productService";
import {useEffect, useState} from "react";
import {storage} from "../../services/firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {getCategory} from "../../services/categoryService";
import swal from "sweetalert";




export default function AddProduct() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => {
        return state.user.currentUser
    })
    const categories = useSelector(state =>{
    return state.categories.categories
    })


    useEffect(()=>{
        dispatch(getCategory())
    },[]);


    const handleAdd = async (values) => {
        let data = {...values};
        dispatch(addProduct(data)).then(()=>{

            swal("Thêm sản phẩm thành công!", {
                icon: "success",
            })
            navigate('/admin/product-management')

        });
    }

    const [images, setImages] = useState([]);

    const [urls, setUrls] = useState([]);

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };



    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("Tập tin có sẵn tại", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("Tất cả hình ảnh được tải lên"))
            .catch((err) => console.log(err));

    }


    return (
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <div className="section-title">
                        <h2>Add Products</h2>
                    </div>
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
                        }}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
                                <Field id = "productName" type="text" className="form-control" name={'productName'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <Field id = "price" type="number" className="form-control" name={'price'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <Field id = "description" type="text" className="form-control"  name={'description'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inventory" className="form-label">Quantity</label>
                                <Field type="number" className="form-control" id="inventory" name={'inventory'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="file">Image</label>
                                <br/>
                                {urls.map((item,ind) => (
                                        <img key={ind} src={item} alt="" style={{width: 50}}/>
                                ))}
                                <br/>
                                <input id="file" type='file' onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-success" style={{marginRight: 10}} type='button'
                                        onClick={handleUpload}>Up
                                </button>

                            </div>
                            <div className="mb-3">
                                <Field as='select' name={'categoryId'} >
                                    {categories !== undefined && categories.map((item)=>(
                                        <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
                                    ))

                                    }
                                </Field>
                            </div>
                            <button style={{marginBottom:50}} type="submit" className="btn btn-outline-primary">Add</button>
                        </Form>
                    </Formik>
                </div>
            </div>

        </>
    )
}