import React, {useState, useEffect} from "react";
// import react-router-dom
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// import verifyAuth
import { verifyUserIsLog } from "../Firebase/ApiAuth";



function PrivateRoute({component: Component, isLog, pathRedirect, ...rest}){
    <Route
        {...rest}
        render={props => 
            isLog?(
                <Component {...props}/>
            ):(
                <Redirect to={{pathname: pathRedirect, state:{from: props.location}}}/>
            )
        }
    />
}
export default function Rotas(){
    
    const [isLog, setIsLog] = useState(false)
    useEffect(()=>{
        verifyUserIsLog(setIsLog)
    },[])
    
    return(
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path='/' isLog={isLog} component={} pathRedirect='/home'/>
                <PrivateRoute exact path='/home' isLog={isLog} component={} pathRedirect='/'/>
            </Switch>
        </BrowserRouter>
    )
}
