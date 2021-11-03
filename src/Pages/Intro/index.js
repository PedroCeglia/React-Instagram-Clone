import React, { useEffect } from 'react'
import './style.css'

// Import History
import { useHistory } from 'react-router'

// Import VerifyAuth
import { verifyUserIsLog } from '../../Firebase/ApiAuth'

export default function Intro(){
    
    // Direcionando Para a Rota Certa
    const history = useHistory()
    function setPage(){
        if(verifyUserIsLog() === "true"){
            history.push('/home')
        }else{
            history.push('/enter')
        }
    }
    useEffect(()=>{
        setTimeout(setPage, 3000)
    })

    return(
        <div className='container-intro'>
            <img src='assets/logo-black-white.png' alt='Logo Black And White'/>
        </div>
    )
}