import React from 'react'
import './style.css'

// Import Widgets
import Login from './Widgets/Login'

export default function Enter(){
    return(
        <div className='container-enter'>
            <div className='container-carrosel'>
            </div>
            <div className='container-inputs'>
                <Login/>
            </div>
        </div>
    )
}