// Auth Reference
import { auth } from "../FirebaseConfig";
// Auth Functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";

// create user
export function createUser(name, email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user
            user.displayName(name)
            // ADD USER IN DATABASE
        }).catch(erro => {
            console.log(erro.mensage)
            console.log(erro.code)
        })
}

// login user
export function singInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
        .then(snapshot =>{

        }).catch(erro => {
            console.log(erro.mensage)
            console.log(erro.code)            
        })
}

// verify if user is log
export function verifyUserIsLog(setIsLog){
    onAuthStateChanged(auth, user =>{
        if(user){
            setIsLog(true)            
        }else{
            setIsLog(false)
        }
    })
}