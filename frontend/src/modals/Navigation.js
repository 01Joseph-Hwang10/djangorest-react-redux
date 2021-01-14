import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import json_cookie from '../routes/auth/cookie';

function Navigation(props) {

    // eslint-disable-next-line
    const {isAuthenticated, setIsAuthenticated} = useAuth();

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
        <div className="flex flex-wrap justify-between items-center w-full p-3 border-b-2 border-black">
            <div className="w-5/12 mx-3 flex justify-start items-center">
                <Link to='/'><span>T&S</span></Link>
                <input placeholder="Search..." className="input2"></input>
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
                    <div className="absolute right-px flex flex-col bg-gray-100 border border-gray-400" style={{display:'none'}} id="menu">
                        <Link><button className="block p-3 border-b border-gray-400" onClick={logOut}>Log out</button></Link>
                        <Link><span className="block p-3">Settings</span></Link>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="flex flex-wrap justify-between w-full p-3 border-b-2 border-black">
                <div className="w-5/12 mx-3 flex justify-start items-center">
                    <Link to='/'><span>T&S</span></Link>
                    <input placeholder="Search..." className="input2"></input>
                </div>
                <div className="w-5/12 mr-3 flex justify-end items-center"><Link to='/login'><span>Log in</span></Link></div>
            </div>
        )
    }

}

export default Navigation;