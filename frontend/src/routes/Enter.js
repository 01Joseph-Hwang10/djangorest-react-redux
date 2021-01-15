import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import json_cookie from "./auth/cookie";

function Enter() {
    // eslint-disable-next-line
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    if(isAuthenticated){
        return (
            <Redirect to={{pathname:`/pinboard/${json_cookie.user_id}`}} />
        )
    } else {
        return (
            <Redirect to={{pathname:'/home'}} />
        )
    }
}

export default Enter;