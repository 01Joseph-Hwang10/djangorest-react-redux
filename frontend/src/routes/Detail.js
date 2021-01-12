import React from "react";
import ToDoDetail from '../components/ToDoDetail';
import useAuth from "../hooks/useAuth";

function Detail(props) {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <ToDoDetail 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        id={props.location.state.id}
        />
    )
}


export default Detail;