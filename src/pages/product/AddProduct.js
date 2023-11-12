import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {addProduct} from "../../services/productsService";
import {useEffect, useState} from "react";
import {storage} from "../../services/firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {getCategory} from "../../services/categoruService";
import swal from "sweetalert";




export default function AddProduct() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => {
        return state.user.currentUser
    })
    const category = useSelector(state =>{
    return state.categories.category
    })


    useEffect(()=>{
        dispatch(getCategory())
    },[]);


    const handleAdd = async (values) => {
        let data = {...values};
        await dispatch(addProduct(data));
        swal("Added new product success!", {
            icon: "success",
        });
        await navigate('/home/manager-product')
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
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
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
                            name: '',
                            price: '',
                            description: '',
                            totalQuantity:'',
                            idCategory: ''
                        }}
                        onSubmit={(values) => {
                            values.image = urls[0]
                            handleAdd(values)
                        }}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Name product</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'name'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Price</label>
                                <Field type="number" className="form-control" id="exampleInput" name={'price'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Description</label>
                                <Field type="text" className="form-control" id="exampleInput" name={'description'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Quantity</label>
                                <Field type="number" className="form-control" id="exampleInput" name={'totalQuantity'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Image</label>
                                <br/>
                                {urls.map(item => (
                                    <>
                                        <img src={item} alt="" style={{width: 50}}/></>
                                ))}
                                <br/>
                                <input type='file' onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-success" style={{marginRight: 10}} type='button'
                                        onClick={handleUpload}>Up
                                </button>

                            </div>
                            <div className="mb-3">
                                <Field as='select' name={'idCategory'} >
                                    {category !== undefined && category.map((item)=>(
                                        <option value={item.id}>{item.name}</option>
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