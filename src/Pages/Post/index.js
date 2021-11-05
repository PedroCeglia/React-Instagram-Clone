import React, {useEffect} from 'react'
import './style.css'

// Import Router Lib
import { useLocation, useHistory } from 'react-router'

// Import AuthApi
import { VerifyListenerUserIsLog } from '../../Firebase/ApiAuth'

// Import Widgets
import Header from '../../Widgets/Header'

export default function Post(){
    
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
            Post
        </div>
    )
}