import React from "react";
import './style.css'

// Import Widgets
import ItemPost from "./ItemPost";

export default function PostContent(){
    return(
        <div className='post-container'>
            <ItemPost/>
            <ItemPost/>
            <ItemPost/>
        </div>
    )
}