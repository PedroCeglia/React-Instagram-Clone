import React, {useState, useEffect} from 'react'
import './style.css'

export default function ItemUser(props){
    
    // Set Image Diretory
    const [srcDiretory, setSrcDirectory] = useState('')
    useEffect(()=>{
        if(props.pathname != null){
            const listSplit = props.pathname.split('/')
            let x = 0
            setSrcDirectory('')
            while(x <= listSplit.length-2){
                if(x !== listSplit.lenght-2){
                    setSrcDirectory( s =>  s +"../" )
                }
                x++
            }        
        }   
    },[props.pathname]) 

    return(
        <div className='user-item-list'>
            <div className='user-dates'>
                <img src={srcDiretory + 'assets/perfil.png'} alt='User Perfil'/>
                <span>user_name</span>
            </div>
        </div>
    )
}