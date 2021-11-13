import React, {useEffect} from 'react'
import './style.css'

// Import React Router
import { useLocation } from 'react-router'

// Import Widgets
import Header from '../../Widgets/Header'

export default function UserFriend(){
    const location = useLocation()
    useEffect(()=>{
      console.log(location)  
    },[location])
    

    return(
        <div className='user-friend-container'>
        </div>
    )
}