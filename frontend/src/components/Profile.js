import React from 'react';
// import CSRFToken from '../csrftoken';
import axios from 'axios';
import json_cookie from '../routes/auth/cookie';

function Profile(props) {

    if (props.isAuthenticated && props.pinboard){
        // CSRF needed!!
        const getPromiseResult = async () => {
            const id = props.user_id
            let token;
            if(json_cookie.access_token) token = json_cookie.access_token;
            const config = {
                headers:{
                    Authorization:`Token ${token}`
                }
            }
            const result = await axios
                                .get(`/backend/users-api/users/${id}/`,config)
                                .then(response => {return response.data})
                                .then(value => {return  value})
                                .catch(error => console.log(error));
            return result;
        }
        const user_data=getPromiseResult();
        try {
            console.log(user_data);
            return (
                <div className="flex flex-col sm:flex-row w-11/12 mx-auto p-2 border-2 mt-5">
                    <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Profile</h1>
                        <h3></h3>
                    </div>
                    <div className="w-1/2 flex flex-col items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Status</h1>
                    </div>
                </div>
            )
        } catch (error) {
            console.log(error);
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