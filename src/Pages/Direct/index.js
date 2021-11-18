import React, {useEffect, useState} from 'react'
import './style.css'

// Import Router lib
import {useLocation, useHistory} from 'react-router-dom'

// Import ApiAuth
import {getUserLog, VerifyListenerUserIsLog} from '../../Firebase/ApiAuth'

// Import DatabaseApi
import { getUserById } from '../../Firebase/ApiDatabase'

// Import Widgets
import Header from '../../Widgets/Header'
import DirectContent from './Widgets/DirectContent'
import DirectNav from './Widgets/DirectNav'

export default function Direct(){
    
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

    // Get User By Auth
    const userAuth = getUserLog()

    // Get User Log by Database using userAuth
    const [user, setUser] = useState()
    useEffect(()=>{
        if(userAuth != null){
            getUserById(userAuth.uid, setUser)
        }
    },[userAuth])

   
    // Chat Set By Id
    const [chatId, setChatId] = useState('')
    
    return(
        <div>
            <Header
                pathname={pathName}
            />
            <div className='direct-container'>
                <DirectNav
                    pathname={pathName}
                    user={user}
                    setChatById={setChatId}
                />
                <DirectContent
                    user={user}
                    userFriendId={chatId}
                />
            </div>
        </div>
    )
}