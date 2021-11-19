import React,{useEffect, useState} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

// Import AuthApi
import { VerifyListenerUserIsLog, getUserLog, logOutUser} from '../../Firebase/ApiAuth'

// Import DatabaseApi
import { getUserLogDatabase, getUserPosts } from '../../Firebase/ApiDatabase'

// Import Widgets 
import Header from '../../Widgets/Header'
import FollowList from '../../Widgets/FollowList'
import ItemPostPage from '../../Widgets/ItemPostPage'

export default function Perfil(){
    
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

    const [descricao, setDescricao] = useState('')
    const [userName, setUserName] = useState('')
    const [userFoto, setUserFoto] = useState('../assets/perfil.png')
    const [publicacoes, setPublicacoes] = useState(0)
    const [seguindo, setSeguindo] = useState(0)
    const [seguidores, setSeguidores] = useState(0)

    // Get User Auth And Database
    // And Config User Dates 
    const userAuth = getUserLog()
    const [userDatabase, setUserDatabase] = useState()
    const [userPosts, setUserPosts] = useState([])
    
    useEffect(()=>{
        if(userAuth != null){
            getUserLogDatabase(userAuth.uid, setUserDatabase)
            getUserPosts(userAuth.uid, setUserPosts)
        }
    },[userAuth])
    useEffect(()=>{
       if(userDatabase != null){
           if(userDatabase.descricao != null){setDescricao(userDatabase.descricao)}
           if(userDatabase.publicacoes != null){setPublicacoes(userDatabase.publicacoes)}
           if(userDatabase.seguindo != null){setSeguindo(userDatabase.seguindo)}
           if(userDatabase.seguidores != null){setSeguidores(userDatabase.seguidores)}
           if(userDatabase.foto != null){setUserFoto(userDatabase.foto)}
           setUserName(userDatabase.nome)
       } 
    },[userDatabase])

    // Function Open FollowList
    const [followType, setFollowType] = useState('')
    function openFollowListSeguidores(){
        let followList = document.querySelector('.container-follow-list')
        followList.classList.toggle('none')
        setFollowType('seguidores')
    }
    function openFollowListSeguindo(){
        let followList = document.querySelector('.container-follow-list')
        followList.classList.toggle('none')
        setFollowType('seguindo')
    }

    return(
        <div className='perfil-page-main-container'>
            <Header
                pathname={pathName}
            />
            <div className='perfil-container'>
                <div className='perfil-info'>
                    <img src={userFoto} alt='User Perfil' title='Alterar foto de perfil'/>
                    <div className='text-info'>
                        <div>
                            <span className='user-name'>{userName}</span>
                            <Link to='/home/perfil/editar_perfil'><button>Editar Perfil</button></Link>
                            <button className='exit' onClick={logOutUser}><img src='../assets/exit.png' alt='Exit Icon'/></button>
                        </div>
                        <div className='perfil-number'>
                            <span className='publicacoes'><strong>{publicacoes}</strong> Publicações</span>
                            <span className='seguidores' onClick={openFollowListSeguidores} ><strong>{seguidores}</strong> Seguidores</span>
                            <span className='seguindo' onClick={openFollowListSeguindo} ><strong>{seguindo}</strong> Seguindo</span>
                        </div>
                        <p className='description'>
                            {descricao}
                        </p>
                    </div>
                </div>
                <div className='perfil-publicacao'>
                    {
                        userPosts.map( (post, key) =>{
                            return(
                                <ItemPostPage idPost={post.idPostagem} pathname={pathName} midiaPost={post.foto} idUser={post.idUsuario} key={key}/>
                            )
                        })
                    }
                </div>
            </div>
            <FollowList 
                pathname={pathName}
                followtype={followType}
                userauth={userAuth}
            />
        </div>
    )
}