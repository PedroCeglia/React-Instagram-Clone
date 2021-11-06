import React from 'react'
import './style.css'

// Import Widgets
import ItemUser from '../../../../Widgets/ItemUser'

export default function HomeNav(){
    return(
        <div className='home-nav'>
            <div className='your-date-home-container'>
                <div className='your-date'>
                    <img src='assets/perfil.png' alt='User Perfil'/>
                    <span>user_name</span>
                </div>
                <span>Mudar</span>
            </div>
            <div className='sugestoes-container'>
                <div className='sugestao-descricao'>
                    <span>Sugestões para você!</span>
                    <span className='ver-tudo'>ver tudo</span>
                </div>
                <div className='sugestao-user-list'>
                    <ItemUser/>
                    <ItemUser/>
                    <ItemUser/>
                    <ItemUser/>
                    <ItemUser/>
                </div>
            </div>
        </div>
    )
}