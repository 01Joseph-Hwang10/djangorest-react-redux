import React, { useState } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

function Navigation(props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (isAuthenticated) {

        return (
        <div>
            <Link><span>myToDoSNS</span></Link>
            <Link><span>Log out</span></Link>
            <div>
                <button>Menu</button>
                <div>
                    <Link><span>Profile</span></Link>
                    <Link><span>Settings</span></Link>
                </div>
            </div>
        </div>
        )
    }

}