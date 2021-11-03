import React, {useEffect} from 'react'
import { useHistory } from 'react-router'
import './style.css'

// Import AuthApi
import { VerifyListenerUserIsLog, logOutUser } from '../../Firebase/ApiAuth'

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

    return(
        <div className='container-home'>
            <h2>Home</h2>
            <button onClick={logOutUser}> west cost bitch</button>
        </div>
    )
}