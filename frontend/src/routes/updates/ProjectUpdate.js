import React from 'react';
import axios from 'axios';
import CSRFToken from '../../csrftoken';
import json_cookie from '../../mixins/cookie';
import { Redirect } from 'react-router-dom';

function ProjectUpdate(props) {
    
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
            const user_project_name = document.querySelector("#user_project_name_input");
            const user_project_description = document.querySelector("#user_project_description_input");
            const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
            if (json_cookie || json_cookie.user_id || json_cookie.access_token) {
                let post_data = {
                    user_project_name:user_project_name.value
                };
                if(user_project_description.value) post_data.user_project_description = user_project_description.value;
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
                .patch(`/backend/users-api/users/${json_cookie.user_id}/`,post_data,config)
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
            <div className="w-11/12 sm:w-1/2 mx-auto border-2 border-blue-100 bg-blue-50 rounded-lg shadow-lg mt-5">
                <form className="w-11/12 mx-auto flex flex-col items-center p-1" onSubmit={UpdateProfile}>
                    <CSRFToken />
                    <input required defaultValue={props.location.state.user_project_name} type="text" id="user_project_name_input" className="mt-5 input2 h-11 p-2" placeholder="Project Name"></input>
                    <input defaultValue={props.location.state.user_project_description} type="textarea" id="user_project_description_input" className="input2 mt-2 h-24 p-2" placeholder="Project Description"></input>
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

export default ProjectUpdate;