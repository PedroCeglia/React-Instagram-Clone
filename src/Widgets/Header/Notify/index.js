import React, { useEffect, useState } from 'react'
import'./style.css'

// Import DatabaseApi
import { getUserNotify } from '../../../Firebase/ApiDatabase'

// Import Widgets
import ItemNotify from './ItemNotify'

export default function Notify(props){

    // Close Notify Conteiner/Content
    function handleConteiner(){
        const notifyContainer = document.querySelector('.header-notify-container')
        const notifyContent = document.querySelector('.header-notify-content')
        notifyContainer.classList.toggle('none')
        notifyContent.classList.toggle('none')
    }

    // Get User Notifys
    const [notifyList, setNotifyList] = useState([])
    useEffect(()=>{
        if(props.user != null){
            getUserNotify(props.user.uid, setNotifyList)
        }
    },[props.user])
    
    // Config List Notify
    const [todayNotifyList, setTodayNotifyList] = useState([])
    const [lastWeekNotifyList, setLastWeekNotifyList] = useState([])
    const [lastMonthNotifyList, setLastMonthNotifyList] = useState([])
    const [previousNotifyList, setPreviousNotifyList] = useState([])
    useEffect(()=>{
        if(notifyList != null){
            const nowTime = new Date().getTime()
            let listToday = []
            let listLastWeek = []
            let listLastMonth = []
            let listPrevious = []
            notifyList.forEach(notify => {
                console.log(nowTime - notify.time)
                if(nowTime - notify.time <= 86400000){
                    listToday.push(notify)
                }
                else if(nowTime - notify.time <= 604800000 && nowTime - notify.time >= 86400000){
                    listLastWeek.push(notify)
                }
                else if(nowTime - notify.time <= 2764800000 && nowTime - notify.time >= 604800000){
                    listLastMonth.push(notify)
                }
                else if(nowTime - notify.time >= 2764800000){
                    listPrevious.push(notify)
                }
            })
            listToday.sort((a, b)=>{ return b.time - a.time})
            listLastWeek.sort((a, b)=>{ return b.time - a.time})
            listLastMonth.sort((a, b)=>{ return b.time - a.time})
            listPrevious.sort((a, b)=>{ return b.time - a.time})
            setTodayNotifyList(listToday)
            setLastWeekNotifyList(listLastWeek)
            setLastMonthNotifyList(listLastMonth)
            setPreviousNotifyList(listPrevious)
        }
    },[notifyList])

    

    return(
        <div className='header-notify-content-conteiner-div'>
            <div className='header-notify-container none' 
            onClick={handleConteiner}>
                
            </div>  
            <div className='header-notify-content none'>
                <div className='header-notify-list'>
                    <h3>Hoje</h3>
                    {
                        todayNotifyList.map((notify, key) => {
                            console.log('oioio')
                            return(
                                <ItemNotify 
                                    srcDiretory = {props.srcDiretory}
                                    key = {key}
                                    notify = {notify}
                                />
                            )
                        })
                    }
                </div>
                <div className='header-notify-list'>
                    <h3>Semana Passada</h3>
                    {
                        lastWeekNotifyList.map((notify, key) => {
                            return(
                                <ItemNotify 
                                    srcDiretory = {props.srcDiretory}
                                    key = {key}
                                    notify = {notify}
                                />
                            )
                        })
                    }
                </div>
                <div className='header-notify-list'>
                    <h3>Mês Passado</h3>
                    {
                        lastMonthNotifyList.map((notify, key) => {
                            return(
                                <ItemNotify 
                                    srcDiretory = {props.srcDiretory}
                                    key = {key}
                                    notify = {notify}
                                />
                            )
                        })
                    }
                </div>
                <div className='header-notify-list'>
                    <h3>Anteriores</h3>
                    {
                        previousNotifyList.map((notify, key) => {
                            return(
                                <ItemNotify 
                                    srcDiretory = {props.srcDiretory}
                                    key = {key}
                                    notify = {notify}
                                />
                            )
                        })
                    }
                </div>
            </div>          
        </div>

    )
}