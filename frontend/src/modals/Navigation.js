import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import json_cookie from '../mixins/cookie';

function Navigation(props) {

    // eslint-disable-next-line
    const {isAuthenticated, setIsAuthenticated} = useAuth();

    const notAvailable = (e) => {
        e.preventDefault();
        alert("Currently not available... Sorry :/");
        e.target.childNodes[0].value=""
    }

    const switchDisplay = () => {
        const menu = document.getElementById("menu")
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
        document.addEventListener("click",(e)=>{
            if (e.target.id !== "menu_btn") {
                menu.style.display="none";
            }
        });
    }

    const logOut = () => {
        document.cookie = "user_id=; path=/;"
        document.cookie = "access_token=; path=/;";
        if (window.location !== "/" || 
            window.location !== "/#" || 
            window.location !== "/#/" || 
            window.location !== "#/") {
            window.location.href = "/";
        } else {
            window.location.reload();
        }
    }


    if (isAuthenticated) {

        return (
        <div className="fixed top-0 flex flex-wrap justify-between items-center w-full p-3 border-b-2 border-blue-50 shadow-lg bg-gray-200">
            <div className="w-5/12 mx-3 flex justify-start items-center font-bold">
                <Link to='/home'>
                    <span className="text-blue-600">T</span>
                    <span className="text-gray-700">&</span>
                    <span className="text-indigo-600">S</span>
                    </Link>
                <input placeholder="Search..." className="input2 ml-3"></input>
            </div>
            <div className="w-5/12 flex mr-3 justify-end items-center">
                <div className="mx-3">
                    <Link to={{
                    pathname:`/pinboard/${json_cookie.user_id}/`
                    }}>
                    <span>Pinboard</span>
                    </Link>
                </div>
                <div className="relative">
                    <button id="menu_btn" onClick={switchDisplay}>Menu</button>
                    <div className="rounded absolute right-px flex flex-col bg-gray-100 border border-gray-400" style={{display:'none'}} id="menu">
                        <button onClick={notAvailable} className="block p-3 border-b border-gray-400 text-center">Info</button>
                        <button onClick={notAvailable} className="block p-3 border-b border-gray-400 text-center">Settings</button>
                        <button className="block p-3 text-center" onClick={logOut}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="fixed top-0 flex flex-wrap justify-between items-center w-full p-3 border-b-2 border-blue-50 shadow-lg bg-gray-200">
                <div className="w-5/12 mx-3 flex justify-start items-center">
                    <Link to='/home'><span className="font-bold">T&S</span></Link>
                    <input placeholder="Search..." className="input2 ml-3"></input>
                </div>
                <div className="w-5/12 mr-3 flex justify-end items-center"><Link to='/login'><span>Log in</span></Link></div>
            </div>
        )
    }

}

export default Navigation;