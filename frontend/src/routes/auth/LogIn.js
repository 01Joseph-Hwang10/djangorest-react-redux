import React from 'react';
import axios from 'axios';
import CSRFToken from '../../csrftoken';
import { Link } from "react-router-dom";

function Login(props) {

    const Login = (e) => {
        e.preventDefault();
        const email = document.querySelector("#email_input").value;
        const password = document.querySelector("#password_input").value;
        const csrftoken = document.getElementsByName("csrfmiddlewaretoken").value;
        const post_data = {
            username:email,
            password:password,
            csrfmiddlewaretoken:csrftoken
        };
        axios
        .post('/backend/users-api/api-token-auth/',post_data)
        .then(response => {
            document.cookie = ("user_id="+response.data.user_id+"; path=/;");
            document.cookie = ("access_token="+response.data.token+"; path=/;");
            window.location.href = "/";
        })
        .catch((error) => {
            console.log(error);
            alert("something went wrong");
        })
    };

    return (
        <div className="w-1/2 mx-auto p-3 border border-gray-600 my-5 flex flex-col items-center">
            <form className="flex flex-col w-11/12 items-center" id="login" onSubmit={Login}>
                <CSRFToken />
                <input id="email_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="email" placeholder="Email"></input>
                <input id="password_input" className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="password" placeholder="Password"></input>
                <button className="p-3 rounded-lg bg-gray-400 text-white w-full text-center my-3">Login</button>
            </form>
            <div className="flex items-center text-gray-600 mx-auto">
                <span>Have no account?</span>
                <Link to='/login/signup'><span className="ml-2 text-center text-green-400 font-bold my-2">Sign Up</span></Link>
            </div>
        </div>
    );
}

export default Login;