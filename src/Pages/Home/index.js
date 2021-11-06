import React, {useEffect} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'

// Import AuthApi
import { VerifyListenerUserIsLog} from '../../Firebase/ApiAuth'

// Import Widgets
import Header from '../../Widgets/Header'
import HomeContent from './Widgets/HomeContent'
import HomeNav from './Widgets/HomeNav'

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
            <div className='container-home-main'>   
                <Header
                    pathname={pathName}
                />
                <div className='container-home'>
                    <HomeContent/>
                    <HomeNav/>
                </div>
            </div>
    )
}
/*

*/