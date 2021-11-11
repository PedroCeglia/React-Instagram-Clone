import React, {useState, useEffect} from 'react'
import './style.css'

// Import Router Libs
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

// Import AuthApi
import { VerifyListenerUserIsLog, getUserLog, setName, setUserPassword} from '../../Firebase/ApiAuth'

// Import StorageApi
import { setUserPerfilFoto } from '../../Firebase/ApiStorage'

// Import DatabaseApi
import {setUserDescriptionDatabase, getUserLogDatabase} from '../../Firebase/ApiDatabase'



// Import Widgets
import Header from '../../Widgets/Header'


export default function EditarPerfil(){

    // Listener IsLog
    const isLog = VerifyListenerUserIsLog()

    // Change To Intro Page
    const history = useHistory()
    useEffect(()=>{
        if(isLog === "false"){
            history.push('/')
        }
    },[isLog, history])

    // Set Image Resource
    const pathName = useLocation().pathname

    // Src User Image
    const [srcUserFoto, setSrcUserFoto] = useState('../../assets/perfil.png')

    ////////////////////////////////// Inputs UseState //////////////////////////// vvvvvvvvvvv
    // Src Input User Name Image
    const [srcInputSetNomeImage, setSrcInputSetNomeImage] = useState('../../assets/pencil.png')
    // Src Input User Description Image
    const [srcInputSetDescricaoImage, setSrcInputSetDescricaoImage] = useState('../../assets/pencil.png')
    // Input User Name
    const [inputUserName, setInputUserName] = useState('')
    // Input User NDescription
    const [inputUserDescription, setInputUserDescription] = useState('')    
    // Src Input User Password 1 Image
    const [srcInputSetPassword1Image, setSrcInputSetPassword1Image] = useState('../../assets/pencil.png')
    // Src Input User Password 2 Image
    const [srcInputSetPassword2Image, setSrcInputSetPassword2Image] = useState('../../assets/pencil.png')
    // Input User Password 1 
    const [inputSetPassword1, setInputSetPassword1] = useState('')
    // Input User Password 2
    const [inputSetPassword2, setInputSetPassword2] = useState('')
    ////////////////////////////////// Inputs Use State //////////////////////////// ^^^^^^^^^^^^^^

    ////////////////////////////////// User Auth ////////////////////////////////// vvvvvvvvvvvvvvvvv
    // User Name
    const [userName, setUserName] = useState('user_name')
    // Get User Auth
    const userAuth = getUserLog()
    // Carregando Dados do Usuario Auth
    useEffect(()=>{
        if(userAuth != null){
            if(userAuth.photoURL != null){
                setSrcUserFoto(userAuth.photoURL)
            } else{
                setSrcUserFoto('../../assets/perfil.png')
            }
            setUserName(userAuth.displayName)
            setInputUserName(userAuth.displayName)
        }
    },[userAuth])

    ////////////////////////////////// User Auth ////////////////////////////////// ^^^^^^^^^^^^^^^

    ////////////////////////////////// User Database ///////////////////////////// vvvvvvvvvvvvvvvvv
    // User Description
    const [userDescription, setUserDescription] = useState('')
    const [userDatabase, setUserDatabase] = useState()
    
    // Carregando Dados do Usuario Database
    useEffect(()=>{
        if(userAuth != null){
            getUserLogDatabase(userAuth.uid, setUserDatabase)
        }
    },[userAuth])
    useEffect(()=>{
        if(userDatabase != null){
            if(userDatabase.descricao != null){
                setUserDescription(userDatabase.descricao)
                setInputUserDescription(userDatabase.descricao)
            }
        }
    },[userDatabase])
    ////////////////////////////////// User Database ///////////////////////////// ^^^^^^^^^^^^^^^^^



    // Change User Name
    function setUserNameInAuthAndDatabase(){
        if(inputUserName !== userName && inputUserName.length > 4){
            setName(inputUserName, userAuth.uid)
            setUserName(inputUserName)
        }
    }
    // Change User Perfil Foto
    function changeUserPerfilFoto(image){
        if(image != null){
            setUserPerfilFoto(image, userAuth.uid, setSrcUserFoto)
        }
    }
    // Change User description
    function setUserDescriptionInDatabase(){
        if(inputUserDescription !== userDescription && inputUserDescription.length > 20 && inputUserDescription.length < 120){
            setUserDescriptionDatabase(inputUserDescription, userAuth.uid)
            setUserDescription(inputUserDescription)
        }
    }

    // Change User Password
    function setUserPasswordInAuth(){
        if(inputSetPassword2 === inputSetPassword1 && inputSetPassword2.length > 6){
            setUserPassword()
        }
    }

    ////////////////////////////////// Inputs UseEffect //////////////////////////// vvvvvvvvvvv
    // Verificando se pode mudar os dados do usuario //  Verify if we can change the user dates
    // user name
    useEffect(()=>{
        if(inputUserName !== userName && inputUserName.length > 4){
            setSrcInputSetNomeImage('../../assets/check.png')
        } else{
            setSrcInputSetNomeImage('../../assets/pencil.png')
        }
    },[inputUserName, userName])
    // user description
    useEffect(()=>{
        if(inputUserDescription !== userDescription && inputUserDescription.length > 20 && inputUserDescription.length < 120){
            setSrcInputSetDescricaoImage('../../assets/check.png')
        } else{
            setSrcInputSetDescricaoImage('../../assets/pencil.png')
        }
    },[inputUserDescription, userDescription])
    // userPassword
    useEffect(()=>{
        if(inputSetPassword1.length>6){
            setSrcInputSetPassword1Image('../../assets/check.png')
        } else{
            setSrcInputSetPassword1Image('../../assets/pencil.png')
        }
    },[inputSetPassword1])
    useEffect(()=>{
        if(inputSetPassword2.length>0){
            if(inputSetPassword2 === inputSetPassword1){
                setSrcInputSetPassword2Image('../../assets/check.png')
            } else{
                setSrcInputSetPassword2Image('../../assets/close.png')
            }
        }else{
            setSrcInputSetPassword2Image('../../assets/pencil.png')
        }
    },[inputSetPassword2, inputSetPassword1])
    ////////////////////////////////// Inputs UseEffect //////////////////////////// ^^^^^^^^^^^^^^

    return(
        <div className='editar-perfil-container-main-page'>
            <Header
                pathname={pathName}
            />
            <div className='backToPerfil'>
                <Link to='/home/perfil'>
                    <img src='../../assets/close.png' alt='Close Icon'/>
                </Link>
            </div>
            <div className='editar-perfil-container'>
                <div className='alterar-foto'>
                    <img src={srcUserFoto} alt='user'/>
                    <div>
                        <span>{userName}</span>
                        <label htmlFor='set-image-edit-perfil-input-file'>Alterar foto de perfil</label>
                        <input type='file' id='set-image-edit-perfil-input-file' onChange={ 
                            file => changeUserPerfilFoto(file.target.files[0])
                        }/>                        
                    </div>

                </div>
                <div className='alterar-nome'>
                    <span>Alterar nome:</span>
                    <div>
                        <input type='text' value={inputUserName} onChange={text => setInputUserName(text.target.value)}/>
                        <img src={srcInputSetNomeImage} alt='Pencil Icon' title='Alterar Nome'
                            onClick={setUserNameInAuthAndDatabase}
                        />
                    </div>
                </div>
                <div className='alterar-descricao'>
                    <span>Alterar descrição:</span>
                    <div>
                        <textarea placeholder='Max 120 caractéres 
                        Min 20 caractéres' value={inputUserDescription} onChange={text => setInputUserDescription(text.target.value)}/>
                        <img src={srcInputSetDescricaoImage} alt='Pencil Icon' title='Alterar Descrição'
                            onClick={setUserDescriptionInDatabase}
                        />
                    </div>
                </div>
                <div className='alterar-senha'>
                    <span>Alterar senha :</span>
                    <div>
                        <input type='password' placeholder='nova senha' value={inputSetPassword1} onChange={text => setInputSetPassword1(text.target.value)} />
                        <img src={srcInputSetPassword1Image} alt='Pencil Icon'/>
                    </div>
                    <span>Confirmar senha :</span>
                    <div>
                        <input type='password' placeholder='nova senha' value={inputSetPassword2} onChange={text => setInputSetPassword2(text.target.value)} />
                        <img src={srcInputSetPassword2Image} alt='Pencil Icon'/>
                    </div>
                    <button onClick={setUserPasswordInAuth}>Alterar Senha</button>
                </div>
            </div>
        </div>
    )
}
