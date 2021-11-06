import React, {useEffect, useState} from 'react'
import './style.css'

// Import Route Libs
import { Link } from 'react-router-dom'

// Import AuthApi
import { getUserLog, logOutUser } from '../../Firebase/ApiAuth'

export default function Header(props){

    // Get User
    const user = getUserLog()

    // Set User Foto
    const [srcUserFoto, setSrcUserFoto] = useState('assets/perfil.png')
    useEffect(()=>{
        if(user != null){
            if(user.photoURL !== null){
                setSrcUserFoto(user.photoURL)
            }
        }
    },[user])

    // Set Image Diretory
    const [srcDiretory, setSrcDirectory] = useState('')
    useEffect(()=>{
        if(props.pathname != null){
            const listSplit = props.pathname.split('/')
            let x = 0
            setSrcDirectory('')
            while(x <= listSplit.length-2){
                if(x !== listSplit.lenght-2){
                    setSrcDirectory( s =>  s +"../" )
                }
                x++
            }        
        }   
    },[props.pathname])
 
    return(
        <div className="header-home">
            <img className='logo-name-image' src={srcDiretory + 'assets/logo-nome.png'} alt='logo nome'/>
            <div className='material-search-view'>
                <label htmlFor='search-view'>
                    <img className='search-icon' src={srcDiretory + 'assets/search.png'} alt='Search View'/>
                </label>
                <input id='search-view' type='text' placeholder='Search'/>
            </div>
            <div className='header-icons'>
                <Link to='/home'>
                    <img src={srcDiretory + 'assets/home.png'} alt='Home Icon'/>
                </Link>

                <Link to='/home/direct'>
                    <img src={srcDiretory + 'assets/direct.png'} alt='Direct Icon'/>
                </Link>

                <Link to='/home/post'>
                    <img src={srcDiretory + 'assets/add-post.png'} alt='Post Icon'/>
                </Link>

                <Link to='/home/explore'>
                    <img src={srcDiretory + 'assets/bussola.png'} alt='Search Icon'/>
                </Link>

                <img src={srcDiretory + 'assets/like.png'} alt='Like Icon'/>
                <Link to='/home/perfil'><img className={'image-perfil-icon'} src={srcUserFoto} alt='user perfil foto'/></Link>
            </div>
        </div>
    )
} 