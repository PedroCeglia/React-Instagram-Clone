// Storage Reference
import {storage, storageEvent} from '../FirebaseConfig'

// Import ApiAuth 
import { setUserFoto } from '../ApiAuth';

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