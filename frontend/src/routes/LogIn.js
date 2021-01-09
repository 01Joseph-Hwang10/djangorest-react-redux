import React from 'react';

function Login(props) {

    const Login = () => {};

    return (
        <div className="w-1/2 mx-auto p-3 border border-gray-600 my-5">
            <form className="flex flex-col items-center" id="login" onSubmit={Login}>
                <input className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="text" placeholder="Email"></input>
                <input className="p-3 rounded-lg border-2 border-gray-400 text-center w-full my-3" required type="text" placeholder="Password"></input>
                <button className="p-3 rounded-lg bg-gray-400 text-white w-full text-center my-3">Login</button>
            </form>
        </div>
    )
}

export default Login;