// Auth Reference
import { auth } from "../FirebaseConfig";
// Auth Functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "@firebase/auth";

// create user
export function createUser(name, email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user
            user.displayName(name)
            // ADD USER IN DATABASE
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
export function verifyListenerUserIsLog(isLog, setIsLog){
    onAuthStateChanged(auth, user =>{
        if(user){
            setIsLog("true")
            console.log(isLog)            
        }else{
            setIsLog("false")
            console.log(isLog)            
        }
    })
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
        return {
            nome:auth.currentUser.displayName,
            id:auth.currentUser.uid,
            email:auth.currentUser.email
        }
    }
}