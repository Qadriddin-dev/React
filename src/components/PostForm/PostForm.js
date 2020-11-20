import React, { useRef} from "react";
//import PostsContext from "../../contexts/PostsContext";
import {editCancel, editChange, editSubmit} from "../../store/actions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";



export default function PostForm(){
      const dispatch=useDispatch()
    const edited=useSelector((state)=>state.edited,shallowEqual)

    const firstFocusEl = useRef(null)
    const handleSubmit=(ev)=>{
        ev.preventDefault()
        dispatch(editSubmit())
        //dispatch({type:'POST_EDIT_SUBMIT'})
       // submit()
        firstFocusEl.current.focus();
    }
    const handleReset=(ev)=>{
        ev.preventDefault()
        dispatch(editCancel())
       // dispatch({type:'POST_EDIT_CANCEL'})
        //cancel()
   }
    const handleChange=(ev)=>{
        const {name,value} = ev.target;
        dispatch(editChange(name,value))
        //dispatch({type:'POST_EDIT_CHANGE',payload:{name,value}})
        //change({name,value})
    }

    return <><form onSubmit={handleSubmit}>
            <textarea ref={firstFocusEl}
                      name="content" value={edited.content||''}
                      onChange={handleChange}
                      placeholder="content"></textarea>
        <input name="tags" value={edited.tags?.join(' ')|| ''} onChange={handleChange} placeholder="tags"/>
        <input name="photo" value={edited.photo?.url || ''} onChange={handleChange} placeholder="photo"/>
        <input name="alt" value={edited.photo?.alt || ''  } onChange={handleChange} placeholder="alt"/>
        <button>Ok</button>
        {edited.id!==0 && <button onClick={handleReset}>Отменить</button>}
    </form></>




}