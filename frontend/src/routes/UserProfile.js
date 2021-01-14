import React from "react";
import Profile from "../components/Profile";
import ToDoLists from '../components/ToDoLists';

function UserProfile() {

    return (
        <>

            <Profile 
            pinboard={false}
            />
            <ToDoLists 
            pinboard={false}
            />

        </>
    )
}

export default UserProfile;