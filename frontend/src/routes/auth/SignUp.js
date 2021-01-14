import React from 'react';
import axios from 'axios';
import CSRFToken from '../../csrftoken';
import json_cookie from './cookie';

function SignUp(props) {

    const checkResponse = (response) => {
        while (!response) {
            if (response) {
                break;
            }
        }
        window.location.href = "/#/login/";
    }   

    const SignUp = (e) => {
        e.preventDefault();
        const first_name = document.querySelector("#first_name_input").value;
        const email = document.querySelector("#email_input").value;
        const password = document.querySelector("#password_input").value;
        const password_confirm = document.querySelector("#password_confirm_input").value;
        const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
        if ( !json_cookie.user_id.length>0 || !json_cookie.access_token.length>0) {
            if (String(password) === String(password_confirm)) {
                let post_data = {
                    first_name:first_name,
                    last_name:"",
                    email:email,
                    password:password,
                    password_confirm:password_confirm
                };
                if(csrftoken.value) {
                    post_data.csrfmiddlewaretoken = csrftoken.value;
                } else {
                    post_data.csrfmiddlewaretoken = false;
                }
                axios
                .post('/backend/users-api/sign-up/',post_data)
                .then(response => {
                    checkResponse(response);
                })
                .catch((error) => {
                    console.log(error);
                    alert("something went wrong");
                });
            } else {
                document.cookie = "user_id=; path=/;";
                document.cookie = "access_token=; path=/;";
                alert("password and your password confirmation doesn't match!");
            }
        } else {
            document.cookie = "user_id=; path=/;";
            document.cookie = "access_token=; path=/;";
            alert("You can't make an account");
        }
    };

    return (
        <div className="w-11/12 sm:w-1/2 mx-auto p-3 border border-gray-600 my-5 flex flex-col items-center">
            <form className="flex flex-col w-11/12 items-center" id="signup" onSubmit={SignUp}>
                <CSRFToken />
                <input id="first_name_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="text" placeholder="Name"></input>
                <input id="email_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="email" placeholder="Email"></input>
                <input id="password_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="password" placeholder="Password"></input>
                <input id="password_confirm_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="password" placeholder="Confirm your password"></input>
                <button className="p-3 rounded-lg bg-gray-400 text-white w-full text-center my-3">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;