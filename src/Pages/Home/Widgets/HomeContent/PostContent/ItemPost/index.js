import React,{useEffect, useState} from 'react'
import './style.css'

// Import DatabaseApi
import { getLikesPost, getCommentsPost, removeLikeInPost, addLikeInPost, addCommentInPost } from '../../../../../../Firebase/ApiDatabase'

// Import Widgets
import FollowList from '../../../../../../Widgets/FollowList'

export default function ItemPost(props){

    // Get User Post Dates And Midia Date
    const [userName, setUserName] = useState('user_name')
    const [postDescription, setPostDescription] = useState('')
    const [userFoto, setUserFoto] = useState('assets/perfil.png')
    const [postFoto, setPostFoto] = useState('assets/perfil.png')
    useEffect(()=>{
        if(props.post != null){
            if(props.post.fotoUsuario != null){
                setUserFoto(props.post.fotoUsuario)
            }
            if(props.post.descricao != null){
                setPostDescription(props.post.descricao)
            }
            setUserName(props.post.nomeUsuario)
            setPostFoto(props.post.fotoPostagem)
        } else{
            setUserName('user_name')
            setUserFoto('assets/perfil.png')
            setPostFoto('assets/perfil.png')
            setPostDescription('')
        }
    },[props.post])

    // Get Likes Post
    const [listLike, setListLike] = useState([])
    const [userLiked, setUserLiked] = useState('false')
    const [srcLikeButton, setSrcLikeButton] = useState('assets/like.png')
    useEffect(()=>{
        if(props.post != null && props.userauth != null){
            getLikesPost(props.post.idPostagem, props.userauth.uid, setUserLiked, setListLike)
        }
    },[props.post, props.userauth])
    useEffect(()=>{
        if(userLiked === 'true'){
            setSrcLikeButton('assets/like-red.png')
        }else{
            setSrcLikeButton('assets/like.png')
        }
    },[userLiked])
    
    // Add or Remove a Like
    function addOrRemoveLike(){
        if(props.userauth != null && props.post){
            if(userLiked === "true"){
                // Remove
                removeLikeInPost(props.post, props.userauth)
            } else{
                // Add
                addLikeInPost(props.post, props.userauth)
            }            
        }

    }

    // Close Likes List
    function toggleLikesList(){
        let likeList = document.querySelector('.post-like .container-follow-list')
        likeList.classList.toggle('none')
    }

    // Get Comment Post
    const [commentList, setCommentList] = useState([])
    useEffect(()=>{
        if(props.post != null){
            getCommentsPost(props.post.idPostagem, setCommentList)
        }
    },[props.post])

    // Add Comments
    const [inputComment, setInputComment] = useState('')
    useEffect(()=>{
        let btnSend = document.querySelector('.post-comentar span')
        if(inputComment.length > 3){    
            btnSend.classList.add('active')
        } else{
            btnSend.classList.remove('active')
        }
    })
    function addComment() {
        if(props.userauth != null && props.post != null && inputComment.length > 3){
            addCommentInPost(props.post, props.userauth, inputComment)
            setInputComment('')
        }
    }  

    // Toggle Comment List
    function toggleCommentList(){
        let commentList = document.querySelector('.post-comentarios .container-follow-list')
        commentList.classList.toggle('none')
    }


    return(
        <div className='post-item'>
            <div className='post-header'>
                <div className='user-date-post'>
                <img className='perfil-foto-post' src={userFoto} alt='User Perfil'/>
                <span>{userName}</span>
                </div>
                <img className='menu-post' src='assets/menu.png' alt='Menu Icon'/>
            </div>
            <div className='post-midia'>
                <img src={postFoto} alt='Main Post'/>
            </div>
            <div className='post-icons'>
                <div className='icons-left'>
                    <img src={srcLikeButton} alt='Like Icon' onClick={addOrRemoveLike}/>
                    <label htmlFor='inputPostComment'><img src='assets/chat.png' alt='Chat Icon'/></label>                        
                    <img src='assets/send.png' alt='Send Icon'/>                        
                </div>
                <img src='assets/save-post.png' alt='Save Icon'/> 
            </div>
            <div className='post-like'>
                <span onClick={toggleLikesList}>Curtidas <strong>{listLike.length}</strong></span>
                <FollowList 
                    userauth = {props.userauth}
                    followtype = 'likes'
                    likeslist = {listLike}
                    classtoggle = '.post-like'
                />
            </div>
            <div className='post-descricao'>   
                <p><span className='user-name'>{userName}</span>{postDescription}</p>
            </div>
            <div className='post-comentarios'>
                <span onClick={toggleCommentList}>Ver todos os {commentList.length} comentarios</span>
                <FollowList
                    userauth = {props.userauth}
                    followtype = 'comment'
                    commentlist = {commentList}
                    classtoggle = '.post-comentarios'
                />
            </div>
            <div className='post-comentar'>
                <input type='text' placeholder='Digite um comentário ...' id='inputPostComment'
                        value={inputComment} onChange={text => setInputComment(text.target.value)}
                />
                <span onClick={addComment}>Publicar</span>
            </div>
        </div>
    )
}