// Storage Reference
import {storage, storageEvent} from '../FirebaseConfig'

// Import Uid
import { v4 as uuidv4 } from 'uuid';

// Import ApiAuth 
import { setUserFoto } from '../ApiAuth';

// Set User Perfil Photo
export function setUserPerfilFoto(image, id, setSrcImage){
    // Storage User Perfil Foto Ref
    const uploadTask = storage.ref().child(`imagens/perfil/${id}.jpeg`).put(image)

    // Storage User Perfil Foto Ref Listener
    uploadTask.on(storageEvent,
        snapshot =>{ // Funções de Ciclo de Vida
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        error => { },
        ()=>{ // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                setUserFoto(downloadURL)
                setSrcImage(downloadURL)
            })
        })
}

// Add Post
export function addPostInStorageAndDatabase(image, descricao, id, addPostAndFeed, listFollowUser){
    const uploadTask = storage.ref().child(`imagens/postagens/${id}/${uuidv4()}`).put(image)
    uploadTask.on(storageEvent,
        snapshot =>{
            // Funções de Ciclo de Vida
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        error => {},
        ()=>{
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                addPostAndFeed(id, descricao, downloadURL, listFollowUser)
            })
        }
    )
}

