import {
    POST_EDIT_SUBMIT,
    POST_EDIT_CANCEL,
    POST_EDIT_CHANGE,
    POST_LIKE,
    POST_REMOVE,
    POST_HIDE,
    POST_EDIT,
    POST_SHOW
} from '../actions/index';

const empty = {
    id:0,
    author:{
        avatar:'https://lms.openjs.io/logo_js.svg',
        name:'OpenJS'
    },
    content:'',
    photo:null,
    hit:false,
    likes:0,
    likedByMe:false,
    hidden:false,
    tags:null,
    created:0
};

export const initialState = {
    posts:[],
    edited: empty
}


export const reducer=(state=initialState,action)=>{
    switch (action.type){
        case POST_EDIT_SUBMIT:return reduceSubmit(state,action);
        case POST_EDIT_CHANGE:return reduceChange(state,action);
        case POST_EDIT_CANCEL:return reduceCancel(state,action);
        case POST_LIKE:return reduceLike(state,action);
        case POST_REMOVE:return reduceRemove(state,action);
        case POST_HIDE:return reduceHide(state,action);
        case POST_EDIT:return reduceEdit(state,action);
        case POST_SHOW:return reduceShow(state,action);
        default:return state
    }
}

const reduceChange=(state,action)=>{
    const {edited}=state;
    const {payload:{name,value}} = action;
    if (name === 'tags') {
        const parsed = value.split(' ')
        return {
            ...state,
            edited:{...edited,[name]:parsed}
        }
    }
    if (name === 'content') {
        return {
            ...state,
            edited: {...edited,[name]:value}
        }
    }
    if (name === "photo" || name === "alt") {
        const photo = {
            url: name === 'photo' ? value : edited.photo?.url,
            alt: name === 'alt' ? value : edited.photo?.alt
        }
        return{
            ...state,
            edited: {...edited,photo:photo}
        }

    }
}

const reduceSubmit=(state,action)=>{
    const {edited,posts}=state;
    const parsed = edited.tags?.map(o => o.replace('#', '')).filter(o => o.trim() !== '') || []
    const tags = parsed.length !== 0 ? parsed : null;
    if (edited.photo && edited.photo?.alt === undefined) {
        edited.photo.alt = ""
    }
    if (edited.photo && (edited.photo?.url === "" || edited.photo?.url === undefined)) {
        edited.photo = null
    }
    const post = {
        ...edited,
        id: edited.id || Date.now(),
        created: edited.created || Date.now(),
        tags: tags,
        photo: edited.photo
    }
    if (edited?.id===0) {
        return {
            ...state,
            posts:[{...post},...posts],
            edited:empty
        }
    }
    if (edited!==undefined) {
        return {
            ...state,
            posts: posts.map(o=>{
                if (o.id!==post.id){return o;}
                return {...post}
            }),
            edited: empty
        }
    }
    return {
        ...state,
        posts: [{...post},...posts],
        edited: empty
    }
}

const reduceCancel=(state,action)=>{
    return {
        ...state,
        edited: empty
    }
}

const reduceLike=(state,action)=>{
    const {posts}=state;
    const {payload:{id}}=action
    return {
        ...state,
        posts: posts.map(o=>{
            if (o.id!==id){return o}
            const likedByMe = !o.likedByMe;
            const likes = likedByMe ? o.likedByMe + 1 : o.likedByMe - 1;
            return {...o, likedByMe, likes}
        })
    }
}

const reduceRemove=(state,action)=>{
    const {posts}=state;
    const {payload:{id}}=action
    return {
        ...state,
        posts: posts.filter(o=>o.id!==id)
    }
}

const reduceHide=(state,action)=>{
    const {posts} = state;
    const {payload:{id}} = action;
    return {
        ...state,
        posts:posts.map(o=>{
            if (o.id!==id){return o}
            const hidden=!o.hidden;
            return {...o,hidden}
        })
    }
}

const reduceShow=(state,action)=>{
    const {posts} = state;
    const {payload:{id}} = action;
    return {
        ...state,
        posts:posts.map(o=>{
            if (o.id!==id){return o}
            const hidden=!o.hidden;
            return {...o,hidden}
        })
    }
}

const reduceEdit=(state,action)=>{
    const {posts}=state;
    const {payload:{id}} =action
    const post = posts.find(o=>o.id===id)
    if (post===undefined){
        return {
            ...state,
        }
    }
    return {
        ...state,
        edited:post
    }

}