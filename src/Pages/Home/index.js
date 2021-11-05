import React, {useEffect} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'

// Import AuthApi
import { VerifyListenerUserIsLog} from '../../Firebase/ApiAuth'
import Header from '../../Widgets/Header'

export default function Home(){

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
                <div className='home-container'>
                    <div className='home-content'>
                        <div className='story-container'></div>
                        <div className='post-container'></div>
                    </div>
                    <div className='home-nav'>
                        <div className='your-date-home-container'></div>
                        <div className='sugestoes-container'></div>
                    </div>
                </div>
            </div>
    )
}
/*

*/