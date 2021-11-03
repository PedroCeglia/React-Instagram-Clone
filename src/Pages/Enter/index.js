import React from 'react'
import './style.css'

// Import Widgets
import Login from './Widgets/Login'
import SingIn from './Widgets/Singin'

export default function Enter(){
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