import React from "react";
// import react-router-dom
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
// import Api Auth
import {verifyUserIsLog} from "../Firebase/ApiAuth"
// import Pages
import Intro from "../Pages/Intro";
import Enter from "../Pages/Enter";
import Home from "../Pages/Home";
// import Pages Contents
import Post from "../Pages/Home/Widgets/Post";
import Perfil from "../Pages/Home/Widgets/Perfil";
import Direct from "../Pages/Home/Widgets/Direct"
import Explore from "../Pages/Home/Widgets/Explore"



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
                <Route exact path='/home/post' component={Post} />
                <Route exact path='/home/direct' component={Direct} />
                <Route exact path='/home/explore' component={Explore} />
            </Switch>
        </BrowserRouter>
    )
}
