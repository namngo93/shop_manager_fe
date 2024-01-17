import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { editCategory, findByCategorytId} from "../../services/categoryService";
import swal from 'sweetalert';


export default function EditProduct() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const category = useSelector(state => {
        return state.categories.category
    });

    useEffect(() => {
        dispatch(findByCategorytId(id))
    }, []);

    const handleEdit = async (values) => {
        dispatch(editCategory(values));
        swal(`Sửa danh mục ${values.categoryName} thành công!`, {
            icon: "success",
        });
        navigate('/admin/category-management')
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign: 'center'}}>Sửa danh mục</h1>
                    <Formik
                        initialValues={
                            category
                        }
                        onSubmit={(values) => {
                            handleEdit(values)
                        }}
                        enableReinitialize={true}
                    >
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="exampleInput" className="form-label">Tên danh mục</label>
                                <Field id = "exampleInput" type="text" className="form-control" name={'categoryName'}/>
                            </div>
                            <button type="submit" className="btn btn-outline-primary primary">Lưu</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <br/>
        </>
    )
}