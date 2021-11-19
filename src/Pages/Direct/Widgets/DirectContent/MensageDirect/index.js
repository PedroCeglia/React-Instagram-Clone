import React, {useState} from "react";
import './style.css'

// Import Widget
import OpenMidia from './OpenMidia'

export default function MensageDirect(props){

    const [active, setActive] = useState('open-midia-container')

    function handlerImage(){
        setActive("open-midia-container active")
    } 
    if(props.type == 'foto'){
            return(
                <div className={props.smsClass}>
                    <img src={props.mensage} alt='image Mensage' onClick={handlerImage}/>
                    <OpenMidia 
                        foto={props.mensage}
                        active={active}
                        setActiveProps={setActive}
                    />
                    <p>                
                        <span className='sms-hour'>{props.smsHour}</span>
                    </p>
                </div>
            )        
    } else if(props.type === 'video'){
        return(
            <div className={props.smsClass}>
            <video width='100%' height='100%' controls>
                <source src={ props.mensage } type="video/mp4"/>
            </video>
            <p>                
                <span className='sms-hour'>{props.smsHour}</span>
            </p>
            </div>
        )
    } else{
        return(
            <p className={props.smsClass}>
                {props.mensage}
                <span className='sms-hour'>{props.smsHour}</span>
            </p>
        )
    }
}