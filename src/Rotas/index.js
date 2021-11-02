import React, {useState, useEffect} from "react";
// import react-router-dom
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// Import Auth
import {auth} from "../Firebase/FirebaseConfig"
// import verifyAuth
import {onAuthStateChanged } from "@firebase/auth";

import {verifyUserIsLog} from "../Firebase/ApiAuth"
// import Pages
import Home from "../Pages/Home";
import Intro from "../Pages/Intro";
import Enter from "../Pages/Enter";



function PrivateRoute({component: Component, log, pathRedirect, ...rest}){
    return(
        <Route
            {...rest}
            render={props =>
                (verifyUserIsLog() == log)?(
                    <Component {...props}/>
                    ):(
                    <Redirect to={{pathname: pathRedirect, state:{from: props.location}}}/>
                )
            }
        />  
    )
}
export default function Rotas(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Intro}/>
                <PrivateRoute exact path='/enter'  log={"false"} component={Enter} pathRedirect='/'/>
                <PrivateRoute exact path='/home'  log={"true"} component={Home} pathRedirect='/'/>
            </Switch>
        </BrowserRouter>
    )
}
