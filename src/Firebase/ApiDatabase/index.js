// Import getDatabase
import { database } from "../FirebaseConfig";
// Import Database Functions
import {set, ref, update, get, onValue} from '@firebase/database'

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
export function setUserDescriptionDatabase(descriptioion, id){
    const userRef = ref(database, `usuarios/${id}`)
    update(userRef,{
        descricao: descriptioion
    })
}

// Get User
export function getUserLogDatabase(id, setUserDatabase){
    get(ref(database, `usuarios/${id}`)).then(snapshot => {
        if(snapshot.exists()){
            setUserDatabase(snapshot.val())
        }
    })
}

// Get User Posts
export function getUserPosts(id, setUserPostList){
    onValue(ref(database, `postagens/${id}`), snapshot => {
        let listPost = []
        if(snapshot.exists()){
            snapshot.forEach( post =>{
                listPost.push(post.val())
            })
            setUserPostList(listPost)
        }
    })
}

// Get User Follow List
export function getFollowList(id, followType, setFollowList) {
    onValue(ref(database, `${followType}/${id}`), snapshot => {
        let listFollowsUsers = []
        if(snapshot.exists()){
            snapshot.forEach( user => {
                listFollowsUsers.push(user.val())
            })
            setFollowList(listFollowsUsers)
        }
    })
}

// Get User List
// The User Log Isn´t Include
export function getUserList(id, setUserList){
    onValue(ref(database, 'usuarios'), snapshot => {
        let userList = []
        if(snapshot.exists()){
            snapshot.forEach( user => {
                if(user.key !== id){
                    userList.push(user.val())
                }
            })
            setUserList(userList)
        }
    })
}  

// Get User Feed
export function getUserFeed(id, setFeedList){
    onValue(ref(database, `feed/${id}`), snapshot => {
        let postList = []
        if(snapshot.exists()){
            snapshot.forEach(post => {
                postList.push(post.val())
            })
            setFeedList(postList)
        }
    })
}