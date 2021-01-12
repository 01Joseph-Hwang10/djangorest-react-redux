import React from "react";
import ToDoLists from '../components/ToDoLists';
import useAuth from "../hooks/useAuth";
import json_cookie from "./auth/cookie";

function Pinboard() {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <ToDoLists 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        pinboard={true}
        user_id={json_cookie.user_id}
        />
    )
}

export default Pinboard;