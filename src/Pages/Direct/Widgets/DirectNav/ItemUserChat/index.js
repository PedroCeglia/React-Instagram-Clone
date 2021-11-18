import React, {useState, useEffect} from 'react'
import './style.css'

// Import DatabaseApi
import {getUserById} from '../../../../../Firebase/ApiDatabase'

export default function ItemUserChat(props){
    
    // Get User by Id
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.user != null){
            getUserById(props.user.id, setUser)
        }
    },[props.user])

    // Cofig User In UI
    const [userFoto, setUserFoto] = useState('../assets/perfil.png')
    const [userName, setUserName] = useState('user_name')
    useEffect(()=>{
        if(user != null){
            setUserName(user.nome)
            if(user.foto != null){setUserFoto(user.foto)}else{setUserFoto('../assets/perfil.png')}
        }else{
            setUserName('user_name')
            setUserFoto('../assets/perfil.png')
        }
    },[user])

    function handlerContainer(){
        if(props.setChatById != null && user != null){
            props.setChatById(user.id)
        }
    }

    return(
        <div className='chat-user-item-container' onClick={handlerContainer}>
            <img src={userFoto} alt='User Perfil'/>
            <span>{userName}</span>
        </div>
    )
}