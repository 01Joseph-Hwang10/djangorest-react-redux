import React from 'react';
import axios from 'axios';
import CSRFToken from '../csrftoken';

function ProfileUpdate(props) {

    const checkResponse = (response) => {
        while (!response) {
            if (response) {
                break;
            }
        }
        window.location.href = "/#/login/";
    }   

    const UpdateProfile = (e) => {
        e.preventDefault();
        const first_name = document.querySelector("#first_name_input").value;
        const email = document.querySelector("#email_input").value;
        const password = document.querySelector("#password_input").value;
        const password_confirm = document.querySelector("#password_confirm_input").value;
        const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
        if (document.cookie.length<=13) {
            if (password === password_confirm) {
                let post_data = {
                    first_name:first_name,
                    last_name:"",
                    email:email,
                    password:password
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
                alert("password and your password confirmation doesn't match!");
            }
        } else {
            alert("You can't make an account");
        }
    };

    return (
        <div className="w-1/2 mx-auto border-2 border-gray-200">
            <form className="w-11/12" onSubmit={UpdateProfile}>
                <CSRFToken />
                <input className="input2" placeholder="nickname"></input>
                <input className="input2" placeholder="bio"></input>
                <input className="input2" placeholder="avatar"></input>
                <button className="button1">Submit</button>
            </form>
        </div>
    )
}

export default ProfileUpdate;