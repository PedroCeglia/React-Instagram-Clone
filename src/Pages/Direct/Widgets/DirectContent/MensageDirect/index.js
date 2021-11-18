import React, {useState} from "react";
import './style.css'

export default function MensageDirect(props){

    /*
    const [active, setActive] = useState('open-midia-container')

    function handlerImage(){
        setActive("open-midia-container active")
    }*/
    return(
        <p className={props.smsClass}>
            {props.mensage}
            <span className='sms-hour'>{props.smsHour}</span>
        </p>
    ) 
    /*
    if(props.foto != null){
        if(props.mensage != null && props.mensage != "image"){
            return(
                <div className={props.smsClass}>
                    <img src={props.foto} alt='image Mensage' onClick={handlerImage}/>
                    <OpenMidia 
                        foto={props.foto}
                        active={active}
                        setActiveProps={setActive}
                    />
                    <p>                
                        {props.mensage}
                        <span className='sms-hour'>{props.smsHour}</span>
                    </p>
                </div>
            )
        } else{
            return(
                <div className={props.smsClass}>
                    <img src={props.foto} alt='image Mensage' onClick={handlerImage}/>
                    <OpenMidia 
                        foto={props.foto}
                        active={active}
                        setActiveProps={setActive}
                    />
                    <p>                
                        <span className='sms-hour'>{props.smsHour}</span>
                    </p>
                </div>
            )
        }
    } else if(props.video != null){
        if(props.mensage != null && props.mensage != "video"){
            
            return(
                <div className={props.smsClass}>
                <video controls>
                    <source src={ props.video } type="video/mp4"/>
                </video>
                <p>                
                    {props.mensage}
                    <span className='sms-hour'>{props.smsHour}</span>
                </p>
                </div>
            )
        } else{
            return(
                <div className={props.smsClass}>
                <video width='100%' height='100%' controls>
                    <source src={ props.video } type="video/mp4"/>
                </video>
                <p>                
                    <span className='sms-hour'>{props.smsHour}</span>
                </p>
                </div>
            )
        }
    } else{
        return(
            <p className={props.smsClass}>
                {props.mensage}
                <span className='sms-hour'>{props.smsHour}</span>
            </p>
        ) 
    }
    */

}