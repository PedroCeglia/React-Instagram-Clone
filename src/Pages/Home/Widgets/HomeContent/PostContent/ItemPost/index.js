import React,{useEffect, useState} from 'react'
import './style.css'

// Import DatabaseApi
import { getLikesPost } from '../../../../../../Firebase/ApiDatabase'

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
        if(userLiked === 'true'){setSrcLikeButton('assets/like-red.png')}else{setSrcLikeButton('assets/like.png')}
    },[userLiked])

    // Get Comment Post

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
                    <img src={srcLikeButton} alt='Like Icon'/>
                    <img src='assets/chat.png' alt='Chat Icon'/>                        
                    <img src='assets/send.png' alt='Send Icon'/>                        
                </div>
                <img src='assets/save-post.png' alt='Save Icon'/> 
            </div>
            <div className='post-like'>
                <span>Curtido por: {listLike.length} pessoas</span>
            </div>
            <div className='post-descricao'>   
                <p><span className='user-name'>{userName}</span>{postDescription}</p>
            </div>
            <div className='post-comentarios'>
                <span>Ver todos os 8 comentarios</span>
            </div>
            <div className='post-comentar'>
                <input type='text' placeholder='Digite um comentário ...'/>
                <span>Publicar</span>
            </div>
        </div>
    )
}