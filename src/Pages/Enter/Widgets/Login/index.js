import React from "react";
import './style.css'

export default function Login(){
    return(
        <div className='container-login'>
            <img className='logo-name' src='assets/logo-nome.png' alt='Logo Nome'/>
            <input type='email' placeholder='Email'/>
            <input type='password' placeholder='Password'/>

            <button className='btn-logar'>Logar</button>

            <div className='container-ou'>
                <span className='border-line'></span>
                <span className='ou'>Ou</span>
                <span className='border-line'></span>
            </div>
            <div className='go-to-singin'>
                <span>Não tem uma conta?</span>
                <button className='btn-go-singin'>Clique aqui</button>
            </div>
        </div>
    )
}