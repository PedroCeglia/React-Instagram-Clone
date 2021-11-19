import React from "react";
import './style.css'

export default function OpenMidia(props){
    function handlerColse(){
        props.setActiveProps('open-midia-container')
    }
    return(
        <div className={props.active}>
            <img className='open-midia-close' src="../assets/close.png" alt="Close" onClick={handlerColse}/>
            <img className='open-midia-image' src={props.foto} alt="Midia Mensage"/>
        </div>
    )
}