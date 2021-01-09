import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Navigation(props) {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (false) {

        return (
        <div className="flex justify-between w-full p-3 border-b-2 border-black">
            <div><Link><span>myToDoSNS</span></Link></div>
            <div><Link><span>Profile</span></Link></div>
            <div>
                <button>Menu</button>
                <div>
                    <Link><span>Log out</span></Link>
                    <Link><span>Settings</span></Link>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="flex justify-between w-full p-3 border-b-2 border-black">
                <div><Link><span>myToDoSNS</span></Link></div>
                <div><Link><span>Log in</span></Link></div>
            </div>
        )
    }

}

export default Navigation;