import React, {useEffect} from 'react'
import { useHistory } from 'react-router'
import './style.css'

// Import AuthApi
import { VerifyListenerUserIsLog } from '../../Firebase/ApiAuth'

// Import Widgets
import Login from './Widgets/Login'
import SingIn from './Widgets/Singin'


export default function Enter(){

    // Listener IsLog
    const isLog = VerifyListenerUserIsLog()

    // Change To Intro Page
    const history = useHistory()
    useEffect(()=>{
        if(isLog === "true"){
            history.push('/')
        }
    },[isLog])


    return(
        <div className='container-enter'>
            <div className='container-carrosel'>
            </div>
            <div className='container-inputs'>
                <Login/>
                <SingIn/>
            </div>
        </div>
    )
}