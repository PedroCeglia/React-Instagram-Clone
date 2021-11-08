import React, {useState, useEffect} from 'react'
import './style.css'

export default function ItemNotify(props) {

    // Config srcDiretory to perfilImage
    const [srcDiretory, setSrcDiretory] = useState(props.srcDiretory + "assets/perfil.png")
    useEffect(()=>{
        if(props.srcDiretory != null){
            setSrcDiretory(props.srcDiretory + "assets/perfil.png")
        }
    },[props.srcDiretory])

    return(
        <div className='item-notify-container'>
            <img src={srcDiretory} alt='User Action'/>
            <span className='user-name'>user_name</span>
            <span className='user-action'>começou a seguir você</span>
        </div>
    )
    
}