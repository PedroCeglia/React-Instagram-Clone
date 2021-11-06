import React, {useState, useEffect} from 'react'
import './style.css'


export default function ItemStory(props) {
   
    // Config User Dates
    const [srcItemImage, setSrcItemImage] = useState('assets/perfil.png')
    const [itemName, setItemName] = useState('user')
    useEffect(()=>{
        if(props.foto != null){
            setSrcItemImage(props.foto)
        }
        if(props.name != null){
            setItemName(props.name)
        }
    },[props.foto, props.name])
    
    return(
        <div className='story-item'>
            <img src={srcItemImage} alt='User Perfil'/>
            <span>{itemName}</span>
        </div>
    )
}