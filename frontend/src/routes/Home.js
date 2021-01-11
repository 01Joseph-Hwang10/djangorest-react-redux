import React from "react";
import ToDoLists from '../components/ToDoLists';
import useAuth from "../hooks/useAuth";

function Home() {
    const {isAuthenticated,setIsAuthenticated} = useAuth();

    return (
        <ToDoLists 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        />
    )
}

export default Home;