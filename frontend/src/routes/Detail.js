import React from "react";
import ToDoDetail from '../components/ToDoDetail';
import useAuth from "../hooks/useAuth";

function Detail(props) {
    const {isAuthenticated,setIsAuthenticated} = useAuth();
    let id;
    if(props.location.state) {
        id = props.location.state.id;
    } else {
        id = window.location.hash.replace(/\D/g,'');
    }

    return (
        <ToDoDetail 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        id={id}
        />
    )
}


export default Detail;