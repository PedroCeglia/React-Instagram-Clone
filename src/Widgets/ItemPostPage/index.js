import React, { useState, useEffect } from 'react'
import './style.css' 

// Import React Router
import { useHistory } from 'react-router'

// Import DatabaseApi
import { getCommentsPost, getOnlyLikesById } from '../../Firebase/ApiDatabase'

export default function ItemPostPage(props){

    // Config Midia Post UI
    const [srcImageMidia, setSrcImageMidia] = useState('../assets/perfil.png')
    useEffect(()=>{
        if(props.midiaPost != null){
            setSrcImageMidia(props.midiaPost)
        } else{
            setSrcImageMidia('../assets/perfil.png')
        }
    },[props.midiaPost])

    // Get Post Comments 
    const [commentList, setCommentList] = useState([])
    useEffect(()=>{
        if(props.idPost != null){
            getCommentsPost(props.idPost, setCommentList)
        }
    },[props.idPost])

    // Get Post Likes
    const [ likesList, setLikesList] = useState([])
    useEffect(()=>{
        if(props.idPost != null){
            getOnlyLikesById(props.idPost, setLikesList)
        }
    },[props.idPost])


    // Open Publicação Page
    const history = useHistory()
    function openPublicacao(){
        if(props.idPost != null && props.idUser != null && props.pathname != null){
            history.push('/home/publicacao',{
                idUser:props.idUser,
                idPost:props.idPost,
                pathname:props.pathname
            })
        }
    }
     
    return(
        <div className='item-post-page-container' onClick={openPublicacao}>
            <img className='midia' src={srcImageMidia} alt='Midia' />
            <div className='item-post-page-container-dates'>
                <img src='../assets/like-red.png' alt='Like Icon'/> 
                <span>{likesList.length}</span>
                <img src='../assets/comment.png' alt='Chat Icon'/> 
                <span>{commentList.length}</span>
            </div>
        </div>
    )
}