import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import './style.css'

// Import AuthApi
import { VerifyListenerUserIsLog, logOutUser, getUserLog } from '../../Firebase/ApiAuth'

export default function Home(){

    // Listener IsLog
    const isLog = VerifyListenerUserIsLog()

    // Change To Intro Page
    const history = useHistory()
    useEffect(()=>{
        if(isLog === "false"){
            history.push('/')
        }
    },[isLog, history])

    // Get User
    const user = getUserLog()

    const [srcUserFoto, setSrcUserFoto] = useState('assets/perfil.png')

    useEffect(()=>{
        if(user.photoURL !== null){
            setSrcUserFoto(user.photoURL)
            console.log(user.photoURL)
        }
    },[user])
    console.log(srcUserFoto)

    return(
        <div className='container-home'>
            
            <div className="header-home">
                <img className='logo-name-image' src='assets/logo-nome.png' alt='logo nome'/>
                <div className='material-search-view'>
                    <label htmlFor='search-view'><img className='search-icon' src='assets/search.png' alt='Search View'/></label>
                    <input id='search-view' type='text' placeholder='Search'/>
                </div>
                <div className='header-icons'>
                    <img src='assets/home.png' alt='Home Icon'/>
                    <img src='assets/direct.png' alt='Direct Icon'/>
                    <img src='assets/add-post.png' alt='Post Icon'/>
                    <img src='assets/bussola.png' alt='Search Icon'/>
                    <img src='assets/like.png' alt='Like Icon'/>
                    <img className='image-perfil-icon' src={srcUserFoto} alt='user perfil foto'/>
                </div>
            </div>
            <h2>Home</h2>
            <button onClick={logOutUser}> west cost bitch</button>
        </div>
    )
}