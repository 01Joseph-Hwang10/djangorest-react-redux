import React from "react";
import ToDoDetail from '../components/ToDoDetail';
import useAuth from "../hooks/useAuth";

function Detail() {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <ToDoDetail 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        />
    )
}


export default Detail;