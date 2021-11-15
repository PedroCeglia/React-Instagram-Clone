// Import getDatabase
import { database } from "../FirebaseConfig";
// Import Database Functions
import {set, ref, update, get, onValue, push, remove} from '@firebase/database'

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

// Get Post Likes
export function getLikesPost(postId, userId, setLikeButton, setListLike) {
    onValue(ref(database, `curtidas/${postId}`), snapshot => {
        let listaLike = []
        setLikeButton('false')
        if(snapshot.exists()){
            snapshot.forEach(like => {
                if(like.val().fotoUsuario != null){
                    listaLike.push({
                        nome:like.val().nomeUsuario,
                        foto:like.val().fotoUsuario,
                        id: like.key
                    })                    
                }else{
                    listaLike.push({
                        nome:like.val().nomeUsuario,
                        id:like.key
                    })
                }
                if(like.key === userId){
                    setLikeButton('true')
                }
            })
        }
        setListLike(listaLike)
    })
}
  
// Add Like In Post
export function addLikeInPost(postId, userLog){
    if(userLog.photoURL != null){
        set(ref(database, `curtidas/${postId}/${userLog.uid}`), {
            fotoUsuario:userLog.photoURL,
            nomeUsuario:userLog.displayName
        })
    } else{
        set(ref(database, `curtidas/${postId}/${userLog.uid}`), {
            nomeUsuario:userLog.displayName
        })
    }
}
 
// Remove Like In Post
export function removeLikeInPost(postId, userLog){
    remove(ref(database, `curtidas/${postId}/${userLog.uid}`))
}

// Get Post Comment
export function getCommentsPost(postId, setCommentsList){
    onValue(ref(database, `comentarios/${postId}`), snapshot => {
        let commentList = []
        if(snapshot.exists()){
            snapshot.forEach(comment => {
                commentList.push(comment.val())
            })
        }
        setCommentsList(commentList)
    })
}
 
// Add Comment In Post
export function addCommentInPost(postId, userLog, comment){
    const newKey = push(ref(database, `comentarios/${postId}`)).key
    if(userLog.photoURL != null){
        set(ref(database, `comentarios/${postId}/${newKey}`),{
            nomeUsuario:userLog.displayName,
            fotoUsuario:userLog.photoURL,
            idUsuario:userLog.uid,
            comentario:comment,
            idComentario:newKey,
            idPostagem:postId
        })        
    } else{
        set(ref(database, `comentarios/${postId}/${newKey}`),{
            nomeUsuario:userLog.displayName,
            idUsuario:userLog.uid,
            comentario:comment,
            idComentario:newKey,
            idPostagem:postId
        })          
    }

}

// ADD Follow
export function addFollow(userAuth, userFriend){
    if(userAuth.foto != null){
        set(ref(database, `seguidores/${userFriend.id}/${userAuth.ud}`),{
            foto:userAuth.foto,
            id:userAuth.id,
            nome:userAuth.nome
        })        
    } else{
        set(ref(database, `seguidores/${userFriend.id}/${userAuth.ud}`),{
            id:userAuth.id,
            nome:userAuth.nome
        })   
    }
    if(userFriend.foto != null){
        set(ref(database, `seguindo/${userAuth.id}/${userFriend.id}`),{
            foto:userFriend.foto,
            id:userFriend.id,
            nome:userFriend.nome
        })        
    } else{
        set(ref(database, `seguindo/${userAuth.id}/${userFriend.id}`),{
            id:userFriend.id,
            nome:userFriend.nome
        }) 
    }
    update(ref(database, `usuarios/${userFriend.id}`),{
        seguidores:userFriend.seguidores + 1
    })
    update(ref(database, `usuarios/${userAuth.id}`),{
        seguindo:userAuth.seguindo + 1
    })
}

// Remove Follow
export function removeFollow(userAuth, userFriend){
    remove(ref(database, `seguindo/${userAuth.id}/${userFriend.id}`))
    remove(ref(database, `seguidores/${userFriend.id}/${userAuth.id}`))
    update(ref(database, `usuarios/${userFriend.id}`),{
        seguidores:userFriend.seguidores - 1
    })
    update(ref(database, `usuarios/${userAuth.id}`),{
        seguindo:userAuth.seguindo - 1
    })
}

// Verify if user is Follow
export function verifyIfIsFollow(userAuth, userFriend, setVerifyIfIsFollow){
    get(ref(database,`seguindo/${userAuth.id}/${userFriend.id}`))
        .then(snapshot => {
            if(snapshot.exists()){
                setVerifyIfIsFollow('true')
            }else{
                setVerifyIfIsFollow('false')
            }
        })
}

// Get User By Id
export function getUserById(userId, setUser){
    onValue(ref(database, `usuarios/${userId}`), snapshot => {
        if(snapshot.exists()){
            setUser(snapshot.val())
        }
    })
}