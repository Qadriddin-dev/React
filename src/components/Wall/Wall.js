import React from "react";
import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";
//import PostsContext from "../../contexts/PostsContext";
import {shallowEqual, useSelector} from "react-redux";


function Wall(){
   /* const {state:{posts}} = useContext(PostsContext)*/
    const posts = useSelector((state)=>state.posts,shallowEqual)

    return <>
            <PostForm/>
        <div>{posts.map(o=><Post post={o} key={o.id}/>)}</div>
            </>

}


export default Wall