import React from "react";
import './Post.css'
import Tags from "../Tags/Tags";
//import PostsContext from "../../contexts/PostsContext";
import {edit, hide, like, remove, show} from "../../store/actions";
import {useDispatch} from "react-redux";


function Post({post}) {
    const {author} = post;
    const {photo} = post
    const dispatch = useDispatch()
    const handleLike=_=>{
        dispatch(like(post.id))
       // dispatch({type:'POST_LIKE',payload:{id:post.id}})
       // like(post.id)
    }
    const handleRemove=_=>{
        dispatch(remove(post.id))
       // dispatch({type:'POST_REMOVE',payload:{id:post.id}})
   //     remove(post.id)
    }
    const handleHide=_=>{
        dispatch(hide(post.id))
      //  dispatch({type:'POST_HIDE',payload:{id:post.id}})
      //toggleVisibility(post.id)
    }
    const handleShow=_=>{
        dispatch(show(post.id))
       // dispatch({type:'POST_SHOW',payload:{id:post.id}})
       // toggleVisibility(post.id)
    }
    const handleEdit=_=>{
        dispatch(edit(post.id))
     //   dispatch({type:'POST_EDIT',payload:{id:post.id}})
        //edit(post.id)
  }

 if(post.hidden) {
     return (
         <article>
             <header>
                 <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                 <h5>{author.name}</h5>
                 <button onClick={handleShow}>показать</button>
                 <div>{post.created}</div>
                 {post.hit ? <span>HIT</span> : null}
             </header>
         </article>
     )
 }
    return (<article>
            <header>
                <img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name}/>
                <h5>{author.name}</h5>
                <button onClick={handleRemove}>удалить</button>
                <button onClick={handleHide}>скрыть</button>
                <button onClick={handleEdit}>изменить</button>
                <div>{post.created}</div>
                {post.hit ? <span>HIT</span> : null}
            </header>

            <div>
                <div className="Post-content">{post.content}</div>
                {photo && <img src={photo.url} alt={photo.alt} className="Post-photo"/>}
            </div>
            <footer>
                <span className="Post-likes" onClick={handleLike}>
                    <img src={post.likedByMe ? "https://lms.openjs.io/liked.svg" : "https://lms.openjs.io/unliked.svg"}
                         alt="likes" width="20" height="20"/>
                    <span className="Post-likes-count">{post.likes}</span>
                    {post.tags ? <Tags tags={post.tags}/> : null}
                </span>
            </footer>
        </article>)
}




export default Post