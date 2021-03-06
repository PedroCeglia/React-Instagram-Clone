import React, {useState, useEffect} from 'react'
import './style.css'

// Import React Router
import { useHistory } from 'react-router'

// Import DatabaseApi
import { getUserLogDatabase } from '../../Firebase/ApiDatabase'

export default function ItemUser(props){

    // Get User
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.user != null){
            getUserLogDatabase(props.user.id, setUser)
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
     
    // Open User Perfil
    const history = useHistory()
    function openUserFriendPage(){
        history.push('/home/userfriend',{
            userId
        })
    }

    return(
        <div className='user-item-list'>
            <div className='user-dates' >
                <img src={srcDiretory} alt='User Perfil'/>
                <span onClick={openUserFriendPage}>{userName}</span>
            </div>
        </div>
    )
}