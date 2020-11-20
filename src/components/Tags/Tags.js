import React from "react";

function Tags({tags}){
    return (
        <>
            теги: {tags.map((tag,i)=> <button key={i}>#{tag}</button>)}
</>
    )
}

export default Tags