import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

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
        document.cookie = "username=; path=/;"
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
        <div className="flex justify-between w-full p-3 border-b-2 border-black">
            <div className="ml-3"><Link to='/'><span>myToDoSNS</span></Link></div>
            <div className="flex mr-3">
                <div className="mx-3"><Link><span>Profile</span></Link></div>
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
            <div className="flex justify-between w-full p-3 border-b-2 border-black">
                <div className="ml-3"><Link to='/'><span>myToDoSNS</span></Link></div>
                <div className="mr-3"><Link to='/login'><span>Log in</span></Link></div>
            </div>
        )
    }

}

export default Navigation;