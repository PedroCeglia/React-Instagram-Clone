import React,{useEffect, useState} from 'react'
import './style.css'

// Import React Router
import {useHistory} from 'react-router-dom'

// Import DatabaseApi
import { getLikesPost, getCommentsPost, removeLikeInPost, addLikeInPost, addCommentInPost, getUserById } from '../../../../../../Firebase/ApiDatabase'

// Import Widgets
import FollowList from '../../../../../../Widgets/FollowList'

export default function ItemPost(props){
 
    // Get Key
    const [key, setKey] = useState("id")
    useEffect(()=>{
        let x = 0
        while(x < props.idKey){
            setKey(text => text + "id")
            x++             
        }
    },[props.idKey])

    const classWithKeyLike = `.post-item.${key} .post-like`
    const classWithKeyComment = `.post-item.${key} .post-comentarios`
    const classWithKey = `post-item ${key}`

    // Get User By Id
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.post != null){
            getUserById(props.post.idUsuario, setUser)
        }
    },[props.post])

    // Get User Post Dates And Midia Date
    const [userName, setUserName] = useState('user_name')
    const [postDescription, setPostDescription] = useState('')
    const [userFoto, setUserFoto] = useState('assets/perfil.png')
    const [postFoto, setPostFoto] = useState('assets/perfil.png')
    useEffect(()=>{
        if(props.post != null && user != null){
            if(user.foto != null){
                setUserFoto(user.foto)
            }
            if(props.post.descricao != null){
                setPostDescription(props.post.descricao)
            }
            setUserName(user.nome)
            setPostFoto(props.post.fotoPostagem)
        } else{
            setUserName('user_name')
            setUserFoto('assets/perfil.png')
            setPostFoto('assets/perfil.png')
            setPostDescription('')
        }
    },[props.post, user])

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
        let likeList = document.querySelector(`.post-item.${key} .post-like .container-follow-list`)
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
        let btnSend = document.querySelector(`.post-item.${key} .post-comentar span`)
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
        let commentList = document.querySelector(`.post-item.${key} .post-comentarios .container-follow-list`)
        commentList.classList.toggle('none')
    }

    // Change The Page
    const history = useHistory()
    function openUserFriendPage(){
        if(user != null){
            history.push('home/userfriend',{
                userId:user.id
            })
        }
    }

    return(
        <div className={classWithKey}>
            <div className='post-header'>
                <div className='user-date-post' onClick={openUserFriendPage}>
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
                    classtoggle = {classWithKeyLike}
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
                    classtoggle = {classWithKeyComment}
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