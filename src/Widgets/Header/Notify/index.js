import React from 'react'
import'./style.css'

// Import Widgets
import ItemNotify from './ItemNotify'

export default function Notify(props){

    // Close Notify Conteiner/Content
    function handleConteiner(){
        const notifyContainer = document.querySelector('.header-notify-container')
        const notifyContent = document.querySelector('.header-notify-content')
        notifyContainer.classList.toggle('none')
        notifyContent.classList.toggle('none')
    }

    return(
        <div className='header-notify-content-conteiner-div'>
            <div className='header-notify-container none' 
            onClick={handleConteiner}>
                
            </div>  
            <div className='header-notify-content none'>
                <div className='header-notify-list'>
                    <h3>Hoje</h3>
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />
                </div>
                <div className='header-notify-list'>
                    <h3>Semana Passada</h3>
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />
                </div>
                <div className='header-notify-list'>
                    <h3>Mês Passado</h3>
                    <ItemNotify
                        srcDiretory = {props.srcDiretory}
                    />

                </div>
                <div className='header-notify-list'>
                    <h3>Anteriores</h3>
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                    <ItemNotify 
                        srcDiretory = {props.srcDiretory}
                    />
                </div>
            </div>          
        </div>

    )
}