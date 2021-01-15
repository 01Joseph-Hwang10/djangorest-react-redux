import React from "react";
import { Redirect } from "react-router-dom";
import json_cookie from "../mixins/cookie";

function Enter() {
    // eslint-disable-next-line

    if(json_cookie && json_cookie.user_id && json_cookie.user_id.length > 0){
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