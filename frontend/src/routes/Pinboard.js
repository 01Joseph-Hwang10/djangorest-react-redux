import React from "react";
import Profile from "../components/Profile";
import ToDoLists from '../components/ToDoLists';
import useAuth from "../hooks/useAuth";
import json_cookie from "./auth/cookie";

function Pinboard() {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <>

            <Profile 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            pinboard={true}
            user_id={json_cookie.user_id}
            />
            <ToDoLists 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            pinboard={true}
            user_id={json_cookie.user_id}
            />

        </>
    )
}

export default Pinboard;