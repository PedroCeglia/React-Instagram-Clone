import React, {useState, useEffect} from "react";
// import react-router-dom
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// import verifyAuth
import { verifyUserIsLog } from "../Firebase/ApiAuth";
// import Pages
import Home from "../Pages/Home";
import Intro from "../Pages/Intro";



function PrivateRoute({component: Component, isLog, log, pathRedirect, ...rest}){
    return(
        <Route
            {...rest}
            render={props => 
                    
                (isLog == log)?(
                    <Component {...props}/>
                    ):(
                    <Redirect to={{pathname: pathRedirect, state:{from: props.location}}}/>
                    )
                
            }
        />  
    )
}
export default function Rotas(){
    const [isLog, setIsLog] = useState(true)
    useEffect(()=>{
        verifyUserIsLog(setIsLog)
    },[])
    
    return(
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path='/' isLog={isLog} log={false} component={Intro} pathRedirect='/home'/>
                <PrivateRoute path='/home' isLog={isLog} log={true} component={Home} pathRedirect='/'/>
            </Switch>
        </BrowserRouter>
    )
}
