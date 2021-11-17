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
export function addLikeInPost(post, userLog){
    if(userLog.photoURL != null){
        set(ref(database, `curtidas/${post.idPostagem}/${userLog.uid}`), {
            fotoUsuario:userLog.photoURL,
            nomeUsuario:userLog.displayName
        })
    } else{
        set(ref(database, `curtidas/${post.idPostagem}/${userLog.uid}`), {
            nomeUsuario:userLog.displayName
        })
    }

    // Change post
    let newPost
    if(post.foto == null){
        newPost = {
            idPostagem:post.idPostagem,
            idUsuario:post.idUsuario,
            foto:post.fotoPostagem
        }
    } else{
        newPost = post
    }

    // Change user Log // Verify if has Foto
    let newUserLog

    if (userLog.photoURL != null){
        newUserLog = { nome:userLog.displayName, id:userLog.uid, foto:userLog.photoURL} 
    }else{
        newUserLog = { nome:userLog.displayName, id:userLog.uid}
    }

    // Get A IdKey
    const likeKey = push(ref(database, `notify/${post.idUsuario}`)).key

    // Add Notify
    addNotifyInDatabse(post.idUsuario, likeKey, newUserLog, newPost, null, 'like')

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
export function addCommentInPost(post, userLog, comment){
    const newKey = push(ref(database, `comentarios/${post.idPostagem}`)).key

    // Change post
    let newPost
    if(post.foto == null){
        newPost = {
            idPostagem:post.idPostagem,
            idUsuario:post.idUsuario,
            foto:post.fotoPostagem
        }
    } else{
        newPost = post
    }

    // Add Comment Tref In Database
    if(userLog.photoURL != null){
        set(ref(database, `comentarios/${newPost.idPostagem}/${newKey}`),{
            nomeUsuario:userLog.displayName,
            fotoUsuario:userLog.photoURL,
            idUsuario:userLog.uid,
            comentario:comment,
            idComentario:newKey,
            idPostagem:newPost.idPostagem
        })        
    } else{
        set(ref(database, `comentarios/${newPost.idPostagem}/${newKey}`),{
            nomeUsuario:userLog.displayName,
            idUsuario:userLog.uid,
            comentario:comment,
            idComentario:newKey,
            idPostagem:newPost.idPostagem
        })          
    }

    // Change user Log // Verify if has Foto
    let newUserLog

    if (userLog.photoURL != null){
        newUserLog = { nome:userLog.displayName, id:userLog.uid, foto:userLog.photoURL} 
    }else{
        newUserLog = { nome:userLog.displayName, id:userLog.uid}
    }


    // Add NotifyRef In Database
    addNotifyInDatabse(newPost.idUsuario, newKey, newUserLog, newPost, comment, 'comment')

}

// ADD Follow
export function addFollow(userAuth, userFriend){
    // Add Follow Reference In Database
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
    
    // Update Follows Number
    update(ref(database, `usuarios/${userFriend.id}`),{
        seguidores:userFriend.seguidores + 1
    })
    update(ref(database, `usuarios/${userAuth.id}`),{
        seguindo:userAuth.seguindo + 1
    })

    // Add Notify
    addNotifyInDatabse(userFriend.id, userAuth.id, userAuth, null, null, 'follow')
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

// ADD Post And Feed
export function addPostAndFeedDatabase(id, url, descricao, followList){
    const postKey = push(ref(database, `postagens/${id}`)).key
    set(ref(database,`postagens/${id}/${postKey}`),{
        idUsuario:id,
        idPostagem:postKey,
        foto:url,
        descricao:descricao
    })
    followList.forEach(user =>{
        if(user.foto != null){
            set(ref(database,`feed/${user.id}/${postKey}`),{
                idUsuario:id,
                idPostagem:postKey,
                fotoPostagem:url,
                fotoUsuario:user.foto,
                nomeUsuario:user.nome,
                descricao:descricao
            })
        } else{
            set(ref(database,`feed/${user.id}/${postKey}`),{
                idUsuario:id,
                idPostagem:postKey,
                fotoPostagem:url,
                nomeUsuario:user.nome,
                descricao:descricao
            })
        }

    })
}

// Get Post By Id
export function getPostById(idUser, idPost, setPost){
    get(ref(database, `postagens/${idUser}/${idPost}`)).then(snapshot =>{
        if(snapshot.exists()){
            setPost(snapshot.val())
        }
    })
}

// Get Likes By Id
export function getOnlyLikesById(idPost, setLikeList){
    onValue(ref(database, `curtidas/${idPost}`), snapshot => {
        let listLike = []
        if(snapshot.exists()){
            snapshot.forEach(like => {
                listLike.push(like.val())
            })
        }
        setLikeList(listLike)
    })
}

// Add Notify
export function addNotifyInDatabse(id, idNotify, userFriend ,post, comment, type){
    // Get Database Reference
    const notifyRef = ref(database, `notify/${id}/${idNotify}`)

    // Get TimeStamp
    const time = new Date().getTime()
    
    if(type === 'follow'){
        set(notifyRef, {
            id:userFriend.id,
            nome:userFriend.nome,
            time:time,
            type:type
        })
    } else if(type === 'comment' && post != null && comment != null){
        set(notifyRef, {
            id:userFriend.id,
            nome:userFriend.nome,
            time:time,
            idPost:post.idPostagem,
            idFoto:post.foto,
            comment:comment,
            type:type
        })
    } else if(type === 'like' && post != null){
        set(notifyRef, {
            id:userFriend.id,
            nome:userFriend.nome,
            time:time,
            idPost:post.idPostagem,
            idFoto:post.foto,
            type:type
        })
    }
    // Add User Foto
    if(userFriend.foto != null){
        update(notifyRef,{
            foto:userFriend.foto
        })
    }
} 