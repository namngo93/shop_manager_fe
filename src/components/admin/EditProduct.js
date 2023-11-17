import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {editProduct, findByIdProduct} from "../../services/productsService";
import {useEffect, useState} from "react";
import {storage} from "../../services/firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {getCategory} from "../../services/categoruService";
import swal from 'sweetalert';


export default function EditProduct() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector(state => {
        return state.products.product
    })
    useEffect(() => {
        dispatch(findByIdProduct(id)).then((value) => {
            setUrls([value.payload.image])
        });
    }, [])


    const category = useSelector(state => {
        return state.categories.category
    })

    useEffect(() => {
        dispatch(getCategory())
    }, []);


    const handleEdit = async (values) => {
        let newProduct = {...values};
        newProduct.image = urls[urls.length-1]
        await dispatch(editProduct(newProduct));
        swal(`Edited ${newProduct.name} success!`, {
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
                      return   await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                        });

                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => swal(`Success!`, {
                icon: "success",
            }))
            .catch((err) => console.log(err));

    }


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
                                <Field type="text" className="form-control" name={'name'}/>
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
                                <Field type="number" className="form-control" name={'totalQuantity'}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Image</label>
                                <br/>

                                <input type='file' onChange={handleChange}>
                                </input>
                                <button className="btn btn-outline-primary" style={{marginRight: 10}} type='button'
                                        onClick={handleUpload}>Up
                                </button>
                                {urls &&
                                    <><img src={urls[urls.length - 1]} alt="" style={{width: 50}}/></>
                                }
                            </div>
                            <div className="mb-3">
                                <Field as='select' name={'idCategory'}>
                                    {category !== undefined && category.map((item) => (
                                        <option value={item.id}>{item.name}</option>
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