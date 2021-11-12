import React, {useState, useEffect} from 'react'
import './style.css'

export default function ItemUser(props){
    
    // Set User Date
    const [userName, setUserName] = useState('')
    const [srcDiretory, setSrcDirectory] = useState('')
    useEffect(()=>{
        if(props.pathname != null){
            if(props.user != null){
                if(props.user.nome != null){setUserName(props.user.nome)
                }else{
                    setUserName('user_name')
                }
                if(props.user.foto != null){
                    setSrcDirectory(props.user.foto)
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
            if(props.user != null){
                if(props.user.nome != null){setUserName(props.user.nome)
                }else{
                    setUserName('user_name')
                }
                if(props.user.foto != null){
                    setSrcDirectory(props.user.foto)
                } else{ setSrcDirectory('./assets/perfil.png')}
            } else{
                setSrcDirectory('./assets/perfil.png')
                setUserName('user_name')
            }
        }     
    },[props.pathname, props.user]) 

    return(
        <div className='user-item-list'>
            <div className='user-dates'>
                <img src={srcDiretory} alt='User Perfil'/>
                <span>{userName}</span>
            </div>
        </div>
    )
}