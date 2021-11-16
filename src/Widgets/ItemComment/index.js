import React, { useState, useEffect } from 'react'
import './style.css'

// Import React Router
import { useHistory } from 'react-router'

// Import DatabaseApi
import { getUserById } from '../../Firebase/ApiDatabase'

export default function ItemComment(props){


    // Get User
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.user != null){
            getUserById(props.user.id, setUser)
        }
    },[props.user]) 

    // Get User Date
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [srcDiretory, setSrcDirectory] = useState('')
    useEffect(()=>{
        if(props.pathname != null){
            if(user != null){
                if(user.id != null){setUserId(user.id)}else{setUserId('')}
                if(user.nome != null){setUserName(user.nome)
                }else{
                    setUserName('user_name')
                }
                if(user.foto != null){
                    setSrcDirectory(user.foto)
                } else{
                    const listSplit = props.pathname.split('/')
                    let x = 0
                    setSrcDirectory('')
                    while(x <= listSplit.length-2){
                        if(x !== listSplit.lenght-2){
                            setSrcDirectory( s =>  s +"../" )
                        }
                        x++
                    }
                    setSrcDirectory( s =>  s + 'assets/perfil.png' )    
                }
            } else{
                const listSplit = props.pathname.split('/')
                let x = 0
                setSrcDirectory('')
                while(x <= listSplit.length-2){
                    if(x !== listSplit.lenght-2){
                        setSrcDirectory( s =>  s +"../" )
                    }
                    x++
                }
                setSrcDirectory( s =>  s + 'assets/perfil.png' )
                setUserName('user_name')                
            }
        } else{
            if(user != null){
                if(user.id != null){setUserId(user.id)}else{setUserId('')}
                if(user.nome != null){setUserName(user.nome)
                }else{
                    setUserName('user_name')
                }
                if(user.foto != null){
                    setSrcDirectory(user.foto)
                } else{ setSrcDirectory('./assets/perfil.png')}
            } else{
                setSrcDirectory('./assets/perfil.png')
                setUserName('user_name')
            }
        }     
    },[props.pathname, user])

    // Get Comment
    const [comment, setComment] = useState('')
    useEffect(()=>{
        if(props.comment != null){
            setComment(props.comment)
        }else{
            setComment('')
        }
    },[props.comment])
        
    // Open User Perfil
    const history = useHistory()
    function openUserFriendPage(){
        history.push('/home/userfriend',{
            userId
        })
    }

    return(
        <div className='comments-date'>
            <img src={srcDiretory} alt='User Perfil'/>
            <p>
                <span onClick={openUserFriendPage}>{userName}</span>
                {comment}            
            </p>
        </div>
    )
}