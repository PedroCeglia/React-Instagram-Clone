import React from 'react'
import './style.css'

// import ApiAuth
import { logOutUser } from '../../Firebase/ApiAuth'

export default function Home(){
    return(
        <div className='container-home'>
            <h2>Home</h2>
            <button onClick={logOutUser}> west cost bitch</button>
        </div>
    )
}