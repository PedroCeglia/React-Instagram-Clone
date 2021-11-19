import React, {useEffect, useState} from 'react'
import './style.css'

// Import React Router
import { useLocation, useHistory } from 'react-router'

// Import DatabaseApi
import { getUserById, getUserPosts, verifyIfIsFollow, addFollow, removeFollow} from '../../Firebase/ApiDatabase'

// Import AuthApi
import { getUserLog } from '../../Firebase/ApiAuth'

// Import Widgets
import Header from '../../Widgets/Header'
import FollowList from '../../Widgets/FollowList'
import ItemPostPage from '../../Widgets/ItemPostPage'

export default function UserFriend(){
  
  // Get Location State And Get UserDates
  const location = useLocation()
  const userId = location.state.userId
  const [user, setUser] = useState('')
  useEffect(()=>{
    if(userId != null){
      getUserById(userId, setUser)
    }
  },[userId])

  // Config User Dates
  const [userName, setUserName] = useState('')
  const [descricao, setDescricao] = useState('')
  const [userFoto, setUserFoto] = useState('../assets/perfil.png')
  const [publicacoes, setPublicacoes] = useState(0)
  const [seguidores, setSeguidores] = useState(0)
  const [seguindo, setSeguindo] = useState(0)
  useEffect(()=>{
    if(user != null ){
      setUserName(user.nome)
      setPublicacoes(user.publicacoes)
      setSeguidores(user.seguidores)
      setSeguindo(user.seguindo)
      if(user.foto != null){setUserFoto(user.foto)}else{setUserFoto('../assets/perfil.png')}
      if(user.descricao != null){setDescricao(user.descricao)}else{setDescricao('')}
    }
  },[user])

  // Function Open FollowList
  const [followType, setFollowType] = useState('')
  function openFollowListSeguidores(){
      let followList = document.querySelector('.container-follow-list')
      followList.classList.toggle('none')
      setFollowType('seguidores')
  }
  function openFollowListSeguindo(){
      let followList = document.querySelector('.container-follow-list')
      followList.classList.toggle('none')
      setFollowType('seguindo')
  }

  // Get UserPosts
  const [userPosts, setUserPosts] = useState([])
  useEffect(()=>{
    if(user != null){
      getUserPosts(user.id, setUserPosts)
    }
  },[user])

  // Get UserAuth
  const userAuthLog = getUserLog()
  const [userAuth, setUserAuth] = useState()
  useEffect(()=>{
    if(userAuthLog != null){
      getUserById(userAuthLog.uid, setUserAuth)
    }
  },[userAuthLog])

  // Verify if UserFriend And UserAuthLog Is the same
  const history = useHistory()
  useEffect(()=>{
    if(userAuthLog != null && user != null){
      if(userAuthLog.uid === user.id){
        history.push('/home/perfil')
      }
    }
  },[userAuthLog, user])

  // Verify if User Is Follow
  const [verifyIsFollow, setVerifyIsFollow] = useState('')
  const [isFollow, setIsFollow] = useState('')
  useEffect(()=>{
    if(userAuth != null && user != null){
      verifyIfIsFollow(userAuth, user, setVerifyIsFollow)
    }
  },[userAuth, user])
  useEffect(()=>{
    if(verifyIsFollow === 'true'){
      setIsFollow('Seguindo')
    }else{
      setIsFollow('Seguir')
    }
  },[verifyIsFollow])

  // ADD or Remove Follow Functions
  function addOrRemoveFollow(){
    if(userAuth != null && user != null){
      if(verifyIsFollow === 'true'){
        removeFollow(userAuth, user)
        setVerifyIsFollow('false')
      } else{
        addFollow(userAuth, user)
        setVerifyIsFollow('true')
      }
    }
  }

  return(
      <div className='user-friend-container'>
        <Header pathname={location.pathname} />
        <div className='perfil-container'>
            <div className='perfil-info'>
                <img src={userFoto} alt='User Perfil' title='Alterar foto de perfil'/>
                <div className='text-info'>
                    <div>
                        <span className='user-name'>{userName}</span>
                    </div>
                    <div className='perfil-number'>
                        <span className='publicacoes'><strong>{publicacoes}</strong> Publicações</span>
                        <span className='seguidores' onClick={openFollowListSeguidores}><strong>{seguidores}</strong> Seguidores</span>
                        <span className='seguindo' onClick={openFollowListSeguindo}><strong>{seguindo}</strong> Seguindo</span>
                    </div>
                    <p className='description'>
                        {descricao}
                    </p>
                    <button className='btn-seguir' onClick={addOrRemoveFollow}>{isFollow}</button>
                </div>
            </div>
            <div className='perfil-publicacao'>
                {
                    userPosts.map( (post, key) =>{
                        return(
                          <ItemPostPage idPost={post.idPostagem} pathname={location.pathname} midiaPost={post.foto} idUser={post.idUsuario} key={key}/>
                        )
                    })
                }
            </div>
        </div>
        <FollowList pathname={location.pathname} followtype={followType} userdatabase={user} />
      </div>
  )
}