import React, {useState, useEffect} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

// Import AuthApi
import { VerifyListenerUserIsLog} from '../../Firebase/ApiAuth'

// Import Widgets
import Header from '../../Widgets/Header'

export default function EditarPerfil(){

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
        <div className='editar-perfil-container-main-page'>
            <Header
                pathname={pathName}
            />
            <div className='backToPerfil'>
                <Link to='/home/perfil'>
                    <img src='../../assets/close.png' alt='Close Icon'/>
                </Link>
            </div>
            <div className='editar-perfil-container'>
                <div className='alterar-foto'>
                    <img src='../../assets/perfil.png' alt='user-image'/>
                    <div>
                        <span>user_name</span>
                        <label htmlFor='set-image-edit-perfil-input-file'>Alterar foto de perfil</label>
                        <input type='file' id='set-image-edit-perfil-input-file'/>                        
                    </div>

                </div>
                <div className='alterar-nome'>
                    <span>Alterar nome:</span>
                    <div>
                        <input type='text'/>
                        <img src='../../assets/pencil.png' alt='Pencil Icon' title='Alterar Nome'/>
                    </div>
                </div>
                <div className='alterar-descricao'>
                    <span>Alterar descrição:</span>
                    <div>
                        <textarea placeholder='Max 120 caractéres'/>
                        <img src='../../assets/pencil.png' alt='Pencil Icon' title='Alterar Descrição'/>
                    </div>
                </div>
                <div className='alterar-senha'>
                    <span>Alterar senha :</span>
                    <div>
                        <input type='password' placeholder='nova senha'/>
                        <img src='../../assets/pencil.png' alt='Pencil Icon'/>
                    </div>
                    <span>Confirmar senha :</span>
                    <div>
                        <input type='password' placeholder='nova senha'/>
                        <img src='../../assets/pencil.png' alt='Pencil Icon'/>
                    </div>
                    <button>Alterar Senha</button>
                </div>
            </div>
        </div>
    )
}
