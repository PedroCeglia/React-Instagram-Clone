import React, {useEffect, useState} from 'react'
import './style.css'

// Import Router Lib
import { useLocation, useHistory } from 'react-router'

// Import AuthApi
import { VerifyListenerUserIsLog, getUserLog } from '../../Firebase/ApiAuth'

// Import DatabaseApi
import { getUserById, getFollowList, addPostAndFeedDatabase } from '../../Firebase/ApiDatabase'

// Storage Api
import { addPostInStorage, deletePostInStorage } from '../../Firebase/ApiStorage'

// Import Widgets
import Header from '../../Widgets/Header'

export default function Post(){
    
    // Listener IsLog
    const isLog = VerifyListenerUserIsLog()

    // Change To Intro Page
    const history = useHistory()
    useEffect(()=>{
        if(isLog === "false"){
            history.push('/')
        }
    },[isLog, history])

    // Set Image Resource
    const pathName = useLocation().pathname

    // Get User
    const userAuth = getUserLog()
    const [userDatabase, setUserDatabase] = useState()
    const[userFoto, setUserFoto] = useState('../assets/perfil.png')
    useEffect(()=>{
        if(userAuth != null){
            getUserById(userAuth.uid, setUserDatabase)
            if(userAuth.photoURL != null){
                setUserFoto(userAuth.photoURL)
            } else{
                setUserFoto('../assets/perfil.png')
            }
        } else{
            setUserFoto('../assets/perfil.png')
        }
    },[userAuth])

    // Post Foto
    const [postFoto, setPostFoto] = useState()
    const [idPostStorage, setIdPostStorage] = useState('')
    const [postUrl, setPostUrl] = useState('../assets/perfil.png')
    useEffect(()=>{
        if(postFoto != null && userAuth != null){
            addPostInStorage(postFoto, userAuth.uid, setIdPostStorage, setPostUrl )
        } else{
            setPostUrl('../assets/perfil.png')
        }
    },[postFoto])

    // Open or Close Edit Post Conteiner
    useEffect(()=>{
        const postContent = document.querySelector('.post-content')
        const editPostContainer = document.querySelector('.edit-post-container')
        const editAlertContent = document.querySelector('.edit-post-alert-content')
        const editPostAlertContainer = document.querySelector('.edit-post-alert-container')
        if(idPostStorage != null && idPostStorage != '' && postUrl != null && postUrl != '' && postUrl !== '../assets/perfil.png'){
            postContent.classList.add('none')
            editPostContainer.classList.remove('none')
            editAlertContent.classList.add('none')
            editPostAlertContainer.classList.remove('none')
        } else{
            postContent.classList.remove('none')
            editPostContainer.classList.add('none')
            editAlertContent.classList.add('none')
            editPostAlertContainer.classList.add('none')
        }
    },[idPostStorage, postUrl])

    // Open or Close Alert Content
    function openAndCloseAlert(){
        const editPostContainer = document.querySelector('.edit-post-container')
        const editAlertContent = document.querySelector('.edit-post-alert-content')
        editPostContainer.classList.toggle('none')
        editAlertContent.classList.toggle('none')
    }

    // Descart Post
    function descartPost(){
        if(idPostStorage != null && userAuth != null){
            deletePostInStorage(userAuth.uid, idPostStorage)
            const postContent = document.querySelector('.post-content')
            const editAlertContent = document.querySelector('.edit-post-alert-content')
            const editPostAlertContainer = document.querySelector('.edit-post-alert-container')
            postContent.classList.remove('none')
            editAlertContent.classList.add('none')
            editPostAlertContainer.classList.add('none')

            setIdPostStorage('')
            setPostUrl('../assets/perfil.png')
            setPostFoto()
        }
    }  

    // Get Follow List
    const [followList, setFollowList] = useState([])
    useEffect(()=>{
        if(userAuth != null){
            getFollowList(userAuth.uid, 'seguidores', setFollowList)
        } else{
            setFollowList([])
        }
    },[userAuth])

    // Get UserAuth by Database
    const [user, setUser] = useState()
    useEffect(()=>{
        if(userAuth != null){
            getUserById(userAuth.uid, setUser)
        }
    },[userAuth])

    // Get Description
    const [descricao, setDescricao] = useState('')

    // Add Post And Feed In Firebase
    function addPostFeedInDatabase(){
        if(user != null && postUrl != null && descricao.length > 5 && followList != null){
            addPostAndFeedDatabase(user.uid, postUrl, descricao, followList, user)
            const postContent = document.querySelector('.post-content')
            const editAlertContent = document.querySelector('.edit-post-alert-content')
            const editPostContainer = document.querySelector('.edit-post-container')
            const editPostAlertContainer = document.querySelector('.edit-post-alert-container')
            postContent.classList.remove('none')
            editPostContainer.classList.add('none')
            editAlertContent.classList.add('none')
            editPostAlertContainer.classList.add('none')
            
            setIdPostStorage('')
            setPostUrl('../assets/perfil.png')
            setPostFoto()
        }
    }

    return(
        <div>
            <Header
                pathname={pathName}
            />
            <div className='post-page-container'>
                <div className='post-content'>
                    <img src='../assets/add-post.png' alt='Add Post Icon'/>
                    <label htmlFor='input-add-post'>Selecione um arquivo do computador</label>
                    <input onChange={foto => setPostFoto(foto.target.files[0])} type='file' id='input-add-post'/>
                </div>
                <div className='edit-post-alert-content none'>            
                    <h4>Descartar Publicação?</h4>
                    <span>Se você sair agora, suas edições não serão salvas.</span>
                    <button onClick={descartPost} className='descart'>Descartar</button>
                    <button onClick={openAndCloseAlert}>Voltar</button>                     
                </div>
                <div className='edit-post-container none'>
                    <img className='post-image' src={postUrl} alt='Post'/>
                    <div className='edit-post-content'>
                        <img onClick={openAndCloseAlert} className='close' src='../assets/close.png' alt='Close Icon'/>
                        <div className='user-dates'>
                            <img src={userFoto} alt='User Perfil'/>
                            <span>user_name</span>
                        </div>
                        <textarea onChange={text => setDescricao(text.target.value)} placeholder='Escreva uma descrição
                        min 5 caractéres'></textarea>
                        <button onClick={addPostFeedInDatabase}>Compartilhar</button>
                    </div>
                </div>             
                <div className='edit-post-alert-container none' onClick={openAndCloseAlert}></div>
                
            </div>
        </div>
    )
}