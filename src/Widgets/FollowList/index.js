import React, { useEffect, useState } from 'react'
import './style.css'

// Import Database Api
import { getFollowList } from '../../Firebase/ApiDatabase'

// Import Widgets
import ItemUser from '../ItemUser'
import ItemComment from '../ItemComment'

export default function FollowList(props){

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

    // Fechar FollowList
    const [classToggle, setClassToggle] = useState('')
    useEffect(()=>{
        if(props.classtoggle != null){
            setClassToggle(props.classtoggle)
        } else{
            setClassToggle('')
        }
    },[props.classtoggle])
    function closeFollowList(){
        let followList = document.querySelector(classToggle + ' .container-follow-list')
        followList.classList.toggle('none')
    }

    // Get User List
    const [listFollow, setListFollow] = useState([])
    const [typeList, setTypeList] = useState('')
    useEffect(()=>{
        if(props.userauth != null){
            if(props.followtype === 'seguindo'){
                getFollowList(props.userauth.uid, 'seguindo', setListFollow)
                setTypeList('Seguindo')
            }else if(props.followtype === 'seguidores'){
                getFollowList(props.userauth.uid, 'seguidores', setListFollow)
                setTypeList('Seguidores')
            }else if(props.followtype === 'likes' && props.likeslist != null ){
                setListFollow(props.likeslist)
                setTypeList('Curtidas')
            }else if(props.followtype === 'comment' && props.commentlist != null ) {
                setListFollow(props.commentlist)
                setTypeList('Comentarios')
            }          
        }
    },[props.followtype, props.likeslist, props.commentlist, props.userauth])

    return(
        <div className='container-follow-list none'>
            <div className='container-follow-list-arrond' onClick={closeFollowList}></div>
            <div className='container-follow-list-content'>
                <div className='container-follow-list-content-header'>
                    <span>{typeList}</span>
                    <img src={ srcDiretory + 'assets/close.png'} alt='Close icon' onClick={closeFollowList}/>
                </div>
                <div className='container-follow-list-content-main'>
                    {listFollow.map((user, key) => {
                        if(props.commentlist != null){
                            return(
                                <ItemComment 
                                    pathname={props.pathname}
                                    key={key}
                                    user={{
                                        nome:user.nomeUsuario,
                                        foto:user.fotoUsuario,
                                        id:user.idUsuario
                                    }}
                                    comment={user.comentario} 
                                />
                            )
                        } else{
                            return(
                                <ItemUser 
                                    pathname={props.pathname}
                                    key={key}
                                    user={user} 
                                />
                            )                            
                        }

                    })}
                </div>
            </div>
        </div>
    )
}