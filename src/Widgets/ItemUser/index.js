import React from 'react'
import './style.css'

export default function ItemUser(){
    return(
        <div className='user-item-list'>
            <div className='user-dates'>
                <img src='assets/perfil.png' alt='User Perfil'/>
                <span>user_name</span>
            </div>
        </div>
    )
}