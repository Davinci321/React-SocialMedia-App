import { useForm } from "react-hook-form"
import * as yup from "yup" 
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from "firebase/firestore"
import { db, auth } from "../Config/Firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import "../App.css"

interface createFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must describe your post")

    });
    const {register, handleSubmit, formState:{errors}} = useForm <createFormData>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "posts")

    const onCreatePost = async (data: createFormData) => {
            await addDoc(postRef, {
           ...data,
            username: user?.displayName,
            id: user?.uid
        })
        navigate("/");
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title..."{...register("title")}/>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description"{...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" className="SubmitForm"/>
            </form>
        </div>
    )
}