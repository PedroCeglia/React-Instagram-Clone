import React, {useState, useEffect} from 'react'
import './style.css'

// Import React Router
import { useHistory, useLocation } from 'react-router'

// Import DatabaseApi
import { getUserById } from '../../../../Firebase/ApiDatabase'


export default function ItemNotify(props) {

    // Config srcDiretory to perfilImage 
    const [srcDiretory, setSrcDiretory] = useState(props.srcDiretory + "assets/perfil.png")
    useEffect(()=>{
        if(props.srcDiretory != null){
            setSrcDiretory(props.srcDiretory + "assets/perfil.png")
        }
    },[props.srcDiretory])

    

    // Get Notify
    const [notify, setNotify] = useState()
    useEffect(()=>{
        if(props.notify != null){
            setNotify(props.notify)
        }
    },[props.notify])

    // Config Notify And Get User
    const [user, setUser] = useState()
    const [notifyMensage, setNotifyMensage] = useState('')
    useEffect(()=>{
        if(notify != null){
            getUserById(notify.id, setUser)
            if(notify.type == 'follow'){
                setNotifyMensage('começou a seguir você')
            } else if(notify.type === 'comment'){
                setNotifyMensage('comentou no seu post')
            } else if(notify.type === 'like'){
                setNotifyMensage('curtiu sua foto')
            }
        }
    },[notify])
    

    // Config User
    const [userImage, setUserImage] = useState(srcDiretory)
    const [userName, setUserName] = useState('user_name')
    useEffect(()=>{
        if(user != null){
            if(notify.foto != null){setUserImage(notify.foto)}else{setUserImage(srcDiretory)} 
            setUserName(user.nome) 
        }else{
            setUserImage(srcDiretory)
            setUserName('userName')
        }
    },[user])

    const history = useHistory()
    const pathName = useLocation().pathname
    // Open Post Page
    function openPostPage(){
        if(notify != null && pathName != null && user != null){
            history.push('/home/publicacao',{
                idPost:notify.idPost,
                idUser:user.id,
                pathname:pathName
            })
        }
    }

    // Open User Page
    function openUserPage(){
        if(user != null){
            history.push('/home/userfriend',{
                userId:user.id
            })
        }
    }

    if(notify != null){
        if(notify.idPost != null && notify.idFoto != null){
            return(
                <div className='item-notify-container' onClick={openPostPage}>
                    <div>
                        <img src={userImage} className='perfil' alt='User Action'/>
                        <span className='user-name'>{userName}</span>
                        <span className='user-action'>{notifyMensage}</span>
                    </div>
                    <img src={notify.idFoto} className='post' alt='Post' />
                </div>
            )
        } else{
            return(
                <div className='item-notify-container' onClick={openUserPage}>
                    <div>
                        <img src={userImage} className='perfil' alt='User Action'/>
                        <span className='user-name'>{userName}</span>
                        <span className='user-action'>{notifyMensage}</span>                        
                    </div>
                </div>
            )    
        }
    }else{
        return(
            <div className='item-notify-container' onClick={openUserPage}>
                <div>
                    <img src={userImage} className='perfil' alt='User Action'/>
                    <span className='user-name'>{userName}</span>
                    <span className='user-action'>{notifyMensage}</span>                    
                </div>
            </div>
        )
    }
}