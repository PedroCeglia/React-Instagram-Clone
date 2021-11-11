// Import React
import { useState, useEffect } from "react";
// Auth Reference
import { auth } from "../FirebaseConfig";
// Auth Functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, updatePassword} from "@firebase/auth";
//import ApiDatabase
import { createUserInDatabase, setUserFotoInDatabse, setUserNameDatabase } from "../ApiDatabase";

// create user 
export function createUser(name, email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user
            // Set User Name
            setName(name, user.uid)
            // ADD USER IN DATABASE
            createUserInDatabase(email, user.uid)
        }).catch(erro => {
            if(erro){
                const errorCode = erro.code;
                switch (errorCode){
                    case 'auth/invalid-email':
                        alert('Digite um valor de e-mail valido! Ex) ...@gmail.com')
                        break
                    case 'auth/email-already-exists':
                        alert('Já existe um usuario com este e-mail!')
                        break
                    case 'auth/weak-password':
                        alert('Digite uma senha com no minimo 6 digitos')
                        break        
                    default:
                        alert('Erro Prencha todos os Campos de Forma Correta')
                        break                             
                }
                console.log(errorCode)               
            }
        })
} 

// set User Name
export function setName(name, id){
    updateProfile(auth.currentUser,{
        displayName:name
    }).then(()=>{
        // set Name In Database
        setUserNameDatabase(name, id)
    }).catch(erro => {
        console.log(erro.code)
    })
}

// set User Foto
export function setUserFoto(url){
    updateProfile(auth.currentUser,{
        photoURL:url
    }).then(()=>{
        // Set In Database
        setUserFotoInDatabse(url, auth.currentUser.uid)
    })
}

// set User Senha
export function setUserPassword(password){
    updatePassword(auth.currentUser, password).then(()=>{
        alert('Parabens, mudou de senha')
    })
}

// login user 
export function singInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then(snapshot =>{

        }).catch(erro => {
            if(erro){
                const errorCode = erro.code;
                switch (errorCode){
                    case 'auth/user-not-found':
                        alert('Não há registro de usuário existente correspondente ao identificador fornecido.')
                        break
                    case 'auth/invalid-email':
                        alert('Digite um valor de e-mail valido! Ex) ...@gmail.com')
                        break
                    case 'auth/wrong-password' :
                        alert('Senha Incorreta, tente de novo!')
                        break   
                    default:
                        alert('Erro Prencha todos os Campos de Forma Correta')
                        break       
                }
                console.log(errorCode)            
            }           
        })
}

// verify Listener if user is log
export function VerifyListenerUserIsLog(){
    const [isLog, setIsLog] = useState()
    useEffect(()=>{
        const listener = onAuthStateChanged(auth, user => (user)?setIsLog("true"):setIsLog("false"))
        return listener
    },[])
    return isLog
}

// verify if user is log
export function verifyUserIsLog(){
    if(auth.currentUser !== null){
        return "true"
    } else{
        return "false"
    }
}

// LogOut User
export function logOutUser(){
    signOut(auth)
}

// return User Log
export function getUserLog(){
    if(auth.currentUser !== null){
        return auth.currentUser
    }
}