import React,{useEffect} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'

// Import AuthApi
import { VerifyListenerUserIsLog} from '../../Firebase/ApiAuth'

// Import Widgets
import Header from '../../Widgets/Header'

export default function Perfil(){
    
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

    const descricao = `Página dedicada a expandir a cultura do surf 🌊🏄‍♂️ \n
                        🌊🌊—-picos da zona sul nos stories—-🏄‍♂️ \n
                        Procurando equipamentos de surf \n
                        Nossa loja @surfshopbrasil`

    return(
        <div>
            <Header
                pathname={pathName}
            />
            <div className='perfil-container'>
                <div className='perfil-info'>
                    <img src='../assets/perfil.png' alt='User Perfil' title='Alterar foto de perfil'/>
                    <div className='text-info'>
                        <div>
                            <span className='user-name'>user_name</span>
                            <button>Editar Perfil</button>
                        </div>
                        <div className='perfil-number'>
                            <span className='publicacoes'><strong>0</strong> Publicações</span>
                            <span className='seguidores'><strong>0</strong> Seguidores</span>
                            <span className='seguindo'><strong>0</strong> Seguindo</span>
                        </div>
                        <p className='description'>
                            {descricao}
                        </p>
                    </div>
                </div>
                <div className='perfil-publicacao'>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                    <img src='../assets/perfil.png' alt='Publicacao'/>
                </div>
            </div>
        </div>
    )
}