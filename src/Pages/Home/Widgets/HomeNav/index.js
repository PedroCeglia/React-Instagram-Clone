import React, { useEffect, useState } from 'react'
import './style.css'

// Import React Router Dom
import { Link } from 'react-router-dom'

// Import DatabaseApi
import { getUserList } from '../../../../Firebase/ApiDatabase'

// Import Widgets
import ItemUser from '../../../../Widgets/ItemUser'

export default function HomeNav(props){

    // Get And Set User Log Dates
    const [userLogName, setUserLogName] = useState('user_name')
    const [userLogFoto, setUserLogFoto] = useState('assets/perfil.png')
    useEffect(()=>{
        if(props.userauth != null){
            if(props.userauth.photoURL != null){
                setUserLogFoto(props.userauth.photoURL)
            }
            setUserLogName(props.userauth.displayName)
        } else{
            setUserLogFoto('assets/perfil.png')
            setUserLogName('user_name')
        }
    },[props.userauth])

    // Get Randow User List
    const [usersList, setUsersList] = useState([])
    useEffect(()=>{
        if(props.userauth){
            getUserList(props.userauth.uid, setUsersList)
        }
    },[props.userauth])
  
    return(
        <div className='home-nav'>
            <div className='your-date-home-container'>
                <div className='your-date'>
                    <img src={userLogFoto} alt='User Perfil'/>
                    <Link to='/home/perfil'><span>{userLogName}</span></Link>
                </div>
                <Link to='/home/perfil/editar_perfil'><span>Mudar</span></Link>
            </div>
            <div className='sugestoes-container'>
                <div className='sugestao-descricao'>
                    <span>Sugestões para você!</span>
                    <span className='ver-tudo'>ver tudo</span>
                </div>
                <div className='sugestao-user-list'>
                    {
                        usersList.map((user, key) => {
                            if(key <= 5){
                                return(
                                    <ItemUser
                                        key={key}
                                        user={user}
                                    />
                                )                                
                            } else{
                                return(<></>)
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
} 