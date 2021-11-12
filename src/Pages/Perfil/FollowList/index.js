import React, { useEffect, useState } from 'react'
import './style.css'

// Import Database Api
import { getFollowList } from '../../../Firebase/ApiDatabase'

// Import Widgets
import ItemUser from '../../../Widgets/ItemUser'

export default function FollowList(props){

    // Fechar FollowList
    function closeFollowList(){
        let followList = document.querySelector('.container-follow-list')
        followList.classList.toggle('none')
    }

    // Get User List
    const [listFollow, setListFollow] = useState([])
    useEffect(()=>{
        if(props.userauth != null){
            if(props.followtype === 'seguindo'){
                getFollowList(props.userauth.uid, 'seguindo', setListFollow)
            }else if(props.followtype === 'seguidores'){
                getFollowList(props.userauth.uid, 'seguidores', setListFollow)
            }            
        }
    },[props.followtype, props.userauth])

    return(
        <div className='container-follow-list none'>
            <div className='container-follow-list-arrond' onClick={closeFollowList}></div>
            <div className='container-follow-list-content'>
                <div className='container-follow-list-content-header'>
                    <span>Follow</span>
                    <img src='../assets/close.png' alt='Close icon' onClick={closeFollowList}/>
                </div>
                <div className='container-follow-list-content-main'>
                    {listFollow.map((user, key) => {
                        return(
                            <ItemUser 
                                pathname={props.pathname}
                                key={key}
                                user={user} 
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}