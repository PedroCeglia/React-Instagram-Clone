import React, {useEffect} from 'react'
import './style.css'

// Import Router lib
import {useLocation, useHistory} from 'react-router-dom'

// Import ApiAuth
import {VerifyListenerUserIsLog} from '../../../../Firebase/ApiAuth'

// Import Widgets
import Header from '../Header'

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

    return(
        <div>
            <Header
                pathname={pathName}
            />
            Direct
        </div>
    )
}