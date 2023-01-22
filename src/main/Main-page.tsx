import {getDocs, collection} from "firebase/firestore"
import { db } from "../Config/Firebase"
import {useState, useEffect} from 'react'
import { Post } from "./Post"

export interface post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}
export const Main = () =>{
    const [postList, setpostList] = useState<post[] | null>(null)
    const postRef = collection(db, "posts")

    const getPost = async() => {
        const data = await getDocs(postRef)
        setpostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as post[])
    }
    useEffect(() =>{
        getPost();
    },[])

    return <div>
        <h1>Homepage</h1>
        <p>{postList?.map((post) => (<Post post ={post}/>))}</p>
    </div>
}