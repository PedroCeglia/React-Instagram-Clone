import React from 'react'
import './style.css'

// Import Widgets 
import MensageDirect from './MensageDirect'

export default function DirectContent(){
    return(
        <div className='direct-content'>
            <div className='chat-none-direct none'>
                <img src='../assets/logo-color.png' alt='Logo Icon'/>
                <p>Escolha uma conversa !</p>
            </div>
            <div className='has-chat '>
                <div className='direct-content-header'>
                    <img src='../assets/perfil.png' alt='User Perfil'/>
                    <span>user-name</span>
                </div>
                <div className='direct-content-content'>
                    <div className='direct-mensage-list'>
                        <MensageDirect
                            smsClass='sms-you'
                            mensage='Tste Cria'
                            smsHour='12:00'
                        />
                        <MensageDirect
                            smsClass='sms-friend'
                            mensage='Tste Cria'
                            smsHour='12:00'
                        />
                    </div>
                    <div className='direct-keyboard'>
                        <input type='text' placeholder='Mensagem...'/>
                        <span>Enviar</span>
                    </div>
                </div>
            </div>
        </div>
    )
}