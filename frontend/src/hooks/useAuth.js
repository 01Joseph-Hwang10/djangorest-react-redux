import {useEffect} from 'react';
import { useState } from 'react';
import json_cookie from "../mixins/cookie";
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Need more fix!!!! More reinforcement!!!
    useEffect(()=>{
        let isMounted = true;
        const cookie = json_cookie;
        if (cookie.user_id && cookie.access_token) {
            const data = {
                    user_id:cookie.user_id,
                    token:cookie.access_token
            };
            axios
            .post('/backend/users-api/check-auth/',data)
            .then( async (response) => {
                const data = await response.data;
                if (data.auth) {
                    if(isMounted) setIsAuthenticated(true);
                } else {
                    console.log("Authorization Failed");
                    if(isMounted) setIsAuthenticated(false);
                }
            })
            .catch(error => console.log(error));
        } else {
            setIsAuthenticated(false);
        }
        return () => {isMounted=false};
    },[isAuthenticated])

    return {
        isAuthenticated:isAuthenticated,
        setIsAuthenticated:setIsAuthenticated,
    };
};


export default useAuth;
