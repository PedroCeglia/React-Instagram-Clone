import React, {useState, useEffect} from 'react'
import './style.css'

// Import DatabaseApi
import { addMensage, addUserChat, getMensageList, getUserById, updateChatTime } from '../../../../Firebase/ApiDatabase'

// Import Widgets 
import MensageDirect from './MensageDirect'

export default function DirectContent(props){

    // Get UserAuth Dates
    const [user, setUser] = useState()
    useEffect(()=>{
        if(props.user != null){
            setUser(props.user)
        }
    },[props.user])

    // Get User Friend Dates
    const [userFriend, setUserFriend] = useState()
    useEffect(()=>{
        if(props.userFriendId != null){
            getUserById(props.userFriendId,setUserFriend)
        }
    },[props.userFriendId])

    // Config User Friend Id
    const [userFriendFoto, setUserFriendFoto] = useState('../assets/perfil.png')
    const [userFriendName, setUserFriendName] = useState('user_friend')
    useEffect(()=>{
        if(userFriend != null){
            if(userFriend.foto != null){setUserFriendFoto(userFriend.foto)}else{setUserFriendFoto('../assets/perfil.png')}
            setUserFriendName(userFriend.nome)
        } else{
            setUserFriendName('user_friend')
            setUserFriendFoto('../assets/perfil.png')
        }
    },[userFriend])

    // Get Mensage List
    const [mensageList, setMensageList] = useState([])
    useEffect(()=>{
        if(user != null && userFriend != null){
            getMensageList(user.id, userFriend.id, setMensageList)
        }
    },[user, userFriend])

    // Add New Mensage
    const [inputMensage, setInputMensage] = useState('')
    function addNewMensage(){
        if(inputMensage.length > 0 && user != null && userFriend != null ){
            if(mensageList.length <= 0){
                addUserChat(user, userFriend)
            } else{
                updateChatTime(user.id, userFriend.id)
            }
            addMensage(user, userFriend.id, inputMensage)

            setInputMensage('')
        }
    }

    return(
        <div className='direct-content'>
            <div className='chat-none-direct none'>
                <img src='../assets/logo-color.png' alt='Logo Icon'/>
                <p>Escolha uma conversa !</p>
            </div>
            <div className='has-chat '>
                <div className='direct-content-header'>
                    <img src={userFriendFoto} alt='User Perfil'/>
                    <span>{userFriendName}</span>
                </div>
                <div className='direct-content-content'>
                    <div className='direct-mensage-list'>
                        {
                            mensageList.map((mensage, key)=>{

                                const classMensage = (mensage.id === user.id)?'sms-you':'sms-friend'

                                return(
                                    <MensageDirect
                                        smsClass={classMensage}
                                        mensage = {mensage.mensagem}
                                        smsHour = {mensage.time}
                                        key = {key}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='direct-keyboard'>
                        <input type='text' placeholder='Mensagem...'
                                value={inputMensage} onChange={text=>{setInputMensage(text.target.value)}}
                        />
                        <button onClick={addNewMensage} >Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}