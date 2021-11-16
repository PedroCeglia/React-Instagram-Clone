import React, {useState, useEffect} from 'react'
import './style.css'

// Import React Router
import { useHistory, useLocation } from 'react-router'

// Import AuthApi
import { getUserLog, VerifyListenerUserIsLog } from '../../Firebase/ApiAuth'

// Import DatabaseApi
import { addCommentInPost, getCommentsPost, getLikesPost, getPostById, getUserById } from '../../Firebase/ApiDatabase'

// Import Widget
import ItemComment from '../../Widgets/ItemComment'
import FollowList from '../../Widgets/FollowList'

export default function Publicacao(){
    
    // Listener IsLog
    const isLog = VerifyListenerUserIsLog()

    // Change To Intro Page
    const history = useHistory()
    useEffect(()=>{
        if(isLog === "false"){
            history.push('/')
        }
    },[isLog, history])

    // Get Image Resource
    const pathName = useLocation().pathname

    // Get State Location 
    const stateLocation = useLocation().state
    

    // Get Post
    const [post, setPost] = useState()
    useEffect(()=>{
        if(stateLocation != null){
            if(stateLocation.idPost != null && stateLocation.idUser != null){
                getPostById(stateLocation.idUser, stateLocation.idPost, setPost)
            }            
        }
    },[stateLocation])
 
    // Config Post In UI
    const [postMidia, setPostMidia] = useState('../assets/perfil.png')
    useEffect(()=>{
        if(post != null){
            setPostMidia(post.foto)
        } else{
            setPostMidia('../assets/perfil.png')
        }
    },[post])


    // Get User
    const [user, setUser] = useState()
    useEffect(()=>{
        if(stateLocation != null){
            if(stateLocation.idUser != null){
                getUserById(stateLocation.idUser, setUser)
            }            
        }

    },[stateLocation])

    // Config User In UI
    const [userName, setUserName] = useState('user_name')
    const [userFoto, setUserFoto] = useState('../assets/perfil.png')
    useEffect(()=>{
        if(user != null){
            setUserName(user.nome)
            if(user.foto != null){setUserFoto(user.foto)}else{setUserFoto('../assets/perfil.png')}
        } else{
            setUserName('user_name')
            setUserFoto('../assets/perfil.png')
        }
    },[user])


    // Get Post Comment
    const [commentsList, setCommentsList] = useState([])
    useEffect(()=>{
        if(stateLocation != null){
            if(stateLocation.idPost != null){
                getCommentsPost(stateLocation.idPost, setCommentsList)
            }            
        }
    },[stateLocation])

    
    // Get Post Likes
    const [likesList, setLikesList] = useState([])
    const [isLike, setIsLike] = useState('')
    useEffect(()=>{
        if(stateLocation != null){
            if(stateLocation.idPost != null && stateLocation.idUser != null){
                getLikesPost(stateLocation.idPost, stateLocation.idUser, setIsLike, setLikesList)
            }
        }
    },[stateLocation])

    // Config Post Like In UI
    const [srcLikeButton, setSrcLikeButton] = useState('../assets/like.png')
    useEffect(()=>{
        if(isLike === 'true'){
            setSrcLikeButton('../assets/like-red.png')
        }else{
            setSrcLikeButton('../assets/like.png')
        }
    },[isLike])

    // Close Likes List
    function toggleLikesList(){
        let likeList = document.querySelector('.container-follow-list')
        likeList.classList.toggle('none')
    }


    // Get User Auth
    const userAuth = getUserLog()

    // Add New Comment
    const [newComment, setNewComment] = useState('')
    function addNewComment(){
        if(stateLocation != null){
            if(stateLocation.idPost != null && userAuth != null && newComment.length > 2){
                addCommentInPost(stateLocation.idPost, userAuth, newComment)
                setNewComment('')
            }
        }
        
    }

    // Back to Last Page
    function backTheLastPage(){
        if(stateLocation != null){
            if(stateLocation.pathname != null){
                history.push(stateLocation.pathname)
            }            
        }
    }

    return(
        <div className='publicacao-container'>
            <img onClick={backTheLastPage} className='close' src='../assets/close.png' alt='Close Icon'/>
            <div className='publicacao-content'>
                <img className='post' src={postMidia} alt='Post'/>
                <div className='publicacao-dates-container'>
                    <div className='publicacao-user-dates'>
                        <img src={userFoto} alt='User Perfil'/>
                        <span>{userName}</span>
                    </div>
                    <div className='publicacao-comment-area'>
                        {commentsList.map((comment, key) =>{
                            return(
                                <ItemComment
                                    pathname={pathName}
                                    user={{id:comment.idUsuario}}    
                                    comment={comment.comentario}
                                    key={key}
                                />
                            )
                        })}
                    </div>
                    <div className='publicacao-icons'>
                        <div className='publicacao-icons-left'>
                            <img src={srcLikeButton} alt='Like Icon'/>
                            <label htmlFor='inputPublicComment'><img src='../assets/chat.png' alt='Chat Icon'/></label>                        
                            <img src='../assets/send.png' alt='Send Icon'/>                        
                        </div>
                        <img src='../assets/save-post.png' alt='Save Icon'/> 
                    </div>
                    <div className='publicacao-like-area'>
                        <span onClick={toggleLikesList}>Curtidas {likesList.length}</span>
                        <FollowList
                            pathname = {pathName}
                            followtype = 'likes'
                            likeslist = {likesList}
                        />
                    </div>
                    <div className='publicacao-input-area'>
                        <input type='text' id='inputPublicComment' placeholder='Adicione um comentario'
                                value={newComment} onChange={text => setNewComment(text.target.value)}
                        />
                        <button onClick={addNewComment}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}