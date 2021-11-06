import React from 'react'
import './style.css'

export default function ItemPost(){
    return(
        <div className='post-item'>
            <div className='post-header'>
                <div className='user-date-post'>
                <img className='perfil-foto-post' src='assets/perfil.png' alt='User Perfil'/>
                <span>User</span>
                </div>
                <img className='menu-post' src='assets/menu.png' alt='Menu Icon'/>
            </div>
            <div className='post-midia'>
                <img src='assets/perfil.png' alt='Main Post'/>
            </div>
            <div className='post-icons'>
                <div className='icons-left'>
                    <img src='assets/like.png' alt='Like Icon'/>
                    <img src='assets/chat.png' alt='Chat Icon'/>                        
                    <img src='assets/send.png' alt='Send Icon'/>                        
                </div>
                <img src='assets/save-post.png' alt='Save Icon'/> 
            </div>
            <div className='post-like'>
                <span>Curtido por : 10 pessoas</span>
            </div>
            <div className='post-descricao'>   
                <p><span className='user-name'>User</span> Dia Lindo :)</p>
            </div>
            <div className='post-comentarios'>
                <span>Ver todos os 8 comentarios</span>
            </div>
            <div className='post-comentar'>
                <input type='text' placeholder='Digite um comentário ...'/>
                <span>Publicar</span>
            </div>
        </div>
    )
}