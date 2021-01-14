import React from 'react';
import axios from 'axios';
import CSRFToken from '../csrftoken';
import json_cookie from './auth/cookie';
import { Redirect } from 'react-router-dom';

function ProfileUpdate(props) {
    
    if(props.location.state){
        
        const checkResponse = (response) => {
            while (!response) {
                if (response) {
                    break;
                }
            }
            window.location.href = `/#/pinboard/${props.location.state.user_id}`;
        }   
    
        const UpdateProfile = (e) => {
            e.preventDefault();
            const first_name = document.querySelector("#first_name_input").value;
            const bio = document.querySelector("#bio_input").value;
            const avatar = document.querySelector("#avatar_input").value;
            const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
            if (!json_cookie || !json_cookie.user_id || !json_cookie.access_token) {
                let post_data = {
                    first_name:first_name,
                    bio:bio,
                    avatar:avatar
                };
                if(csrftoken.value) {
                    post_data.csrfmiddlewaretoken = csrftoken.value;
                } else {
                    post_data.csrfmiddlewaretoken = false;
                }
                let token;
                if(json_cookie.access_token) token = json_cookie.access_token;
                const config = {
                    headers:{
                        Authorization:`Token ${token}`
                    }
                }   
                axios
                .post(`/backend/users-api/users/${json_cookie.user_id}`,post_data,config)
                .then(response => {
                    checkResponse(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert("something went wrong");
                });
            } else {
                alert("No Permission");
            }
        };
    
        return (
            <div className="w-11/12 sm:w-1/2 mx-auto border-2 border-gray-200 mt-5">
                <form className="w-11/12 mx-auto flex flex-col items-center p-1" onSubmit={UpdateProfile}>
                    <CSRFToken />
                    <input type="text" id="first_name_input" className="mt-5 input2 h-11 p-2" placeholder="nickname"></input>
                    <input type="textarea" id="bio" className="input2 mt-2 h-24 p-2" placeholder="bio"></input>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" id="avatar" className="input2 mt-2 h-11 p-1" placeholder="avatar"></input>
                    <button className="button1 mt-2 w-11/12 mb-5 p-1">Submit</button>
                </form>
            </div>
        )
    } else {
        return (
            <Redirect to={{pathname:`/pinboard/${json_cookie.user_id}`}} />
        )
    }

}

export default ProfileUpdate;