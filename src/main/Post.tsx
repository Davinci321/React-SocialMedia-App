import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../Config/Firebase"
import { post as Ipost } from "./Main-page"
import { useEffect, useState } from "react"

interface props {
    post: Ipost
}
interface Like{
    userId: string;
    likeId: string;
}

export const Post = (props: props) => {
    const {post} = props
    const[user] = useAuthState(auth)
    const [likes, setlikes] = useState<Like[]| null>(null)

    const likedRef = collection(db, "likes")
    const likesDoc = query(likedRef, where("postId", "==", post.id))

    const getLikes = async() => {
      const data = await getDocs(likesDoc)
      setlikes(data.docs.map((doc) => ({userId:doc.data().userId, likeId: doc.id})))
    }

    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid)

    useEffect(()=>{
        getLikes
    }, [])

    const addLike = async () => {
         try {
        const newDoc = await addDoc(likedRef, {userId: user?.uid , postId: post.id})

        if  (user){
                 setlikes((prev)=> 
                 prev?[...prev, {userId: user?.uid, likeId: newDoc.id}]: [{userId: user?.uid, likeId: newDoc.id}])}
            }catch (err){
                console.log(err)
            }
            }
            
    const removeLike = async () => {
        try {
            
            const likeToDeleteQuery = query(likedRef, where("postId", "==", post.id),
             where ("userId", "==", user?.uid))

             const likeTodeleteData = await getDocs(likeToDeleteQuery)
             const likeId =likeTodeleteData.docs[0].id
             const liketodelete = doc(db, "likes",likeId) 
            await deleteDoc(liketodelete)

     if  (user){
              setlikes((prev)=> prev && prev.filter((like) => like.likeId !== likeId))
              }
            }catch (err){
               console.log(err)
               }
             }

    return <div>

        <div><h1>{post.title}</h1></div>
        <div className="body"><p>{post.description}</p></div>
        <div className="footer"><p>@{post.username}</p></div>
        <button onClick={hasUserLiked ? removeLike: addLike}> {hasUserLiked? <>&1288078; </>:<>&#128077;</>}</button>
        {likes && <p>Likes: {likes?.length} </p>}

        </div>
}