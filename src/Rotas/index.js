import React from "react";
// import react-router-dom
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// import Api Auth
import {verifyUserIsLog} from "../Firebase/ApiAuth"
// import Pages
import Intro from "../Pages/Intro";
import Enter from "../Pages/Enter";
import Home from "../Pages/Home";
import Post from "../Pages/Post";
import Perfil from "../Pages/Perfil";
import EditarPerfil from "../Pages/EditarPerfil";
import Direct from "../Pages/Direct"
import Explore from "../Pages/Explore"
import UserFriend from "../Pages/UserFriend"



function PrivateRoute({component: Component, log, pathRedirect, ...rest}){
    
    return(
        <Route
            {...rest}
            render={props =>
                (verifyUserIsLog() === log)?(
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
                <Route exact path='/home/perfil' component={Perfil}/>
                <Route exact path='/home/perfil/editar_perfil' component={EditarPerfil}/>
                <Route exact path='/home/post' component={Post} />
                <Route exact path='/home/direct' component={Direct} />
                <Route exact path='/home/explore' component={Explore} />
                <Route exact path='/home/userfriend' component={UserFriend}/>
            </Switch>
        </BrowserRouter>
    )
}
