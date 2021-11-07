import React from 'react'
import './style.css'

// Import Widgets
import ItemUser from '../../../../Widgets/ItemUser'

export default function DirectNav(props){
    return(
        <div className='direct-nav'>
            <div className='direct-nav-header'>
                <label htmlFor='find-user-direct'><img src='../assets/search.png' alt='Search Icon'/></label>
                <input type='text' id='find-user-direct' placeholder='find user...'/>
            </div>
            <div className='direct-nav-nav'>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
                <ItemUser pathname={props.pathname}/>
            </div>
        </div>
    )
}