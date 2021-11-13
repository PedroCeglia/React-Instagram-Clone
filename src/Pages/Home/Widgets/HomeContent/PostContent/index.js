import React, {useState, useEffect} from "react";
import './style.css'

// Import Database Api
import { getUserFeed } from "../../../../../Firebase/ApiDatabase";

// Import Widgets
import ItemPost from "./ItemPost";

export default function PostContent(props){
    
    // Get Feed List
    const [feedList, setFeedList] = useState([])
    useEffect(()=>{
        if(props.userauth != null){
            getUserFeed(props.userauth.uid, setFeedList)
        }
    },[props.userauth])
    return(
        <div className='post-container'>
            {
                feedList.map((post, key) =>{
                    return(
                        <ItemPost
                            key={key}
                            post={post}
                            userauth={props.userauth}
                        />
                    )
                })
            }
        </div>
    )
}