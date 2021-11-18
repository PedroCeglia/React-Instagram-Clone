import React, {useState, useEffect} from 'react'
import './style.css'

// Import DatabaseApi
import { getChatList, getUserList } from '../../../../Firebase/ApiDatabase'

// Import Widgets
import ItemUserChat from './ItemUserChat'


export default function DirectNav(props){

    //Get User by props
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.user != null){
            setUser(props.user)
        }
    },[props.user])

    // Get User Chats List
    const [chatList, setChatList] = useState([])
    useEffect(()=>{
        if(user != null){
            getChatList(user.id, setChatList)
        }
    },[user])

    // Get User List
    const [userList, setUserList] = useState([])
    useEffect(()=>{
        if(user != null){
            getUserList(user.id, setUserList)
        }
    },[user])


    // Filtrando Chats
    const [inputUserName, setInputUserName] = useState('')
    const [chatFilterList, setChatFilterList] = useState([])
    useEffect(()=>{
        if(inputUserName.length >= 1){
            let newFilterList = []
            userList.filter(user => {
                if(user.nome.indexOf(inputUserName) >= 0){
                    newFilterList.push(user)
                }
            })
            if(newFilterList.length === 0){
                setChatFilterList([])
            } else{
                setChatFilterList(newFilterList)
            }

        }else if(chatList != null){
            setChatFilterList(chatList)
        } else{
            setChatFilterList([])
        }
    },[inputUserName, chatList])

    return(
        <div className='direct-nav'>
            <div className='direct-nav-header'>
                <label htmlFor='find-user-direct'><img src='../assets/search.png' alt='Search Icon'/></label>
                <input type='text' id='find-user-direct' placeholder='find user...'
                    value={inputUserName} onChange={ text => {setInputUserName(text.target.value)}}
                />
            </div>
            <div className='direct-nav-nav'>
                {
                    chatFilterList.map((user, key) => {
                        return(
                            <ItemUserChat
                                key={key}
                                user={user}
                                setChatById={props.setChatById}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}