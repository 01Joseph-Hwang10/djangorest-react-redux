import {useEffect} from 'react';
import { useState } from 'react';
import json_cookie from "../routes/auth/cookie";
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Need more fix!!!! More reinforcement!!!
    useEffect(()=>{
        const cookie = json_cookie;
        if (cookie.username && cookie.access_token) {
            const data = {
                    username:cookie.username,
                    token:cookie.access_token
            };
            axios
            .post('/backend/users-api/check-auth/',data)
            .then(response => {
                const data = response.data;
                if (data.auth) {
                    setIsAuthenticated(true);
                } else {
                    console.log("Authorization Failed");
                    setIsAuthenticated(false);
                }
            })
            .catch(error => console.log(error));
        } else {
            setIsAuthenticated(false);
        }
    },[])

    return {
        isAuthenticated:isAuthenticated,
        setIsAuthenticated:setIsAuthenticated,
    };
};


export default useAuth;
