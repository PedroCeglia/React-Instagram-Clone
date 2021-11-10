// Import getDatabase
import { database } from "../FirebaseConfig";
// Import Database Functions
import {set, ref, update} from '@firebase/database'

// Create User In Database
export function createUserInDatabase(email, id){
    const userRef = ref(database, `usuarios/${id}`)
    set(userRef,{
        email:email,
        id:id,
        publicacoes:0,
        seguidores:0,
        seguindo:0
    })
}

// Update User Name In Database 
export function setUserNameDatabase(name, id){
    const userRef = ref(database, `usuarios/${id}`)
    update(userRef, {
        nome:name
    })
}

// Update User Image
export function setUserFotoInDatabse(url, id){
    const userRef = ref(database, `usuarios/${id}`)
    update(userRef,{
        foto:url
    })
}

// Update User Description
export function setUserDescription(descriptioion, id){
    const userRef = ref(database, `usuarios/${id}`)
    update(userRef,{
        descricao: descriptioion
    })
}