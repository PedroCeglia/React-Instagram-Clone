import React, { useState } from 'react'
import './style.css'

// Import ApiAuth
import { createUser } from '../../../../Firebase/ApiAuth'

export default function SingIn(){

    // Leitura de Campos e SingIn
    const [campoNome, setCampoNome] = useState('')
    const [campoEmail, setCampoEmail] = useState('')
    const [campoSenha, setCampoSenha] = useState('')
    function verificaCampos(){
        if(campoNome.length >= 4){
            if(campoEmail.indexOf('@') > -1){
                if(campoSenha.length > 6){
                    createUser(campoNome, campoEmail, campoSenha)
                } else{
                    alert("A Senha Precisa Ter Mais De 6 Digitos")
                }
            }else{
                alert("Digite Um Email Valido")
            }
        }else{
            alert("O Nome Deve Ter Mais De 3 Letras")
        }
    }

    // Acesso a Area de Login
    function changeToLogIn(){
        let singIn = document.querySelector('.inputs-enter.singin')
        let login = document.querySelector('.inputs-enter.login')

        singIn.classList.toggle('default')
        login.classList.toggle('default')
    }
    return(
        <div className='inputs-enter singin'>
                <img className='logo-name' src='assets/logo-nome.png' alt='Logo Nome'/>
                <input type='text' placeholder='Nome'
                        value={campoNome} onChange={text => {setCampoNome(text.target.value)}}
                />
                <input type='email' placeholder='Email'
                        value={campoEmail} onChange={text => {setCampoEmail(text.target.value)}}
                />
                <input type='password' placeholder='Password'
                        value={campoSenha} onChange={text => {setCampoSenha(text.target.value)}}
                />

                <button className='btn-enter' onClick={verificaCampos}>Cadastrar</button>

                <div className='container-ou'>
                    <span className='border-line'></span>
                    <span className='ou'>Ou</span>
                    <span className='border-line'></span>
                </div>
                <div className='go-to-other-page'>
                    <span>Não tem uma conta?</span>
                    <button className='btn-go-to-other-page' onClick={changeToLogIn}>Clique aqui</button>
                </div>
        </div>
    )
}