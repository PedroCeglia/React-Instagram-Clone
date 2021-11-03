import React, {useState} from "react";
import './style.css'

// Import Api Auth
import {singInUser} from '../../../../Firebase/ApiAuth'

export default function Login(){

    // Leitura de Campos E Login
    const [campoEmail, setCampoEmail] = useState('')
    const [campoSenha, setCampoSenha] = useState('')
    function verificaCampos(){
        if(campoEmail.indexOf('@') > -1 ){
            if(campoSenha.length > 6){
                singInUser(campoEmail, campoSenha)
            } else{
                alert('A Senha Precisa ter no Minimo 6 Digitos')
            }
        }else{
            alert('Preencha um Email Que Seja Valido')
        }
    } 

    // Acesso a Area de Cadastro
    function changeToSingIn(){
        let singIn = document.querySelector('.inputs-enter.singin')
        let login = document.querySelector('.inputs-enter.login')

        singIn.classList.toggle('default')
        login.classList.toggle('default')
    }

    return(
        <div className='inputs-enter login default'>
            <img className='logo-name' src='assets/logo-nome.png' alt='Logo Nome'/>
            <input type='email' placeholder='Email'
                    value={campoEmail} onChange={text => {setCampoEmail(text.target.value)}}
            />
            <input type='password' placeholder='Password'
                    value={campoSenha} onChange={text => {setCampoSenha(text.target.value)}}
            />
            <button className='btn-enter' onClick={verificaCampos}>Logar</button>
            <div className='container-ou'>
                <span className='border-line'></span>
                <span className='ou'>Ou</span>
                <span className='border-line'></span>
            </div>
            <div className='go-to-other-page'>
                <span>Não tem uma conta?</span>
                <button className='btn-go-other-page' onClick={changeToSingIn}>Clique aqui</button>
            </div>
        </div>
    )
}