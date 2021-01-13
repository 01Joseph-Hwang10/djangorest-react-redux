import React from 'react';
// import CSRFToken from '../csrftoken';
import axios from 'axios';

function Profile(props) {

    if (props.isAuthenticated && props.pinboard){
        const id = props.user_id
        // CSRF needed!!
        const user_data = axios.get(`/backend/users-api/users/${id}/`)
        return (
            <div className="flex flex-col sm:flex-row w-11/12 mx-auto p-2 border-2 mt-5">
                <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                    <h1 className="text-xl font-bold">Profile</h1>
                </div>
                <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                    <h1 className="text-xl font-bold">Status</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col sm:flex-row w-11/12 mx-auto p-2 border-2 mt-5">
                <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                    <h1 className="text-xl font-bold">Profile</h1>
                </div>
                <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                    <h1 className="text-xl font-bold">Status</h1>
                </div>
            </div>
        )
    }
    

};

export default Profile;