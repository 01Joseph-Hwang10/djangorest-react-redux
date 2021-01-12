import React from "react";
import ToDoLists from '../components/ToDoLists';
import useAuth from "../hooks/useAuth";

function Pinboard() {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <ToDoLists 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        pinboard={true}
        />
    )
}

export default Pinboard;