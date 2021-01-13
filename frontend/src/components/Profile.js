import React from 'react';
import json_cookie from '../routes/auth/cookie';
// import CSRFToken from '../csrftoken';
import axios from 'axios';

class Profile extends React.Component {
    state={
        isLoading:true,
    };
    getProfile = async () => {
        let token;
        if(json_cookie.access_token) token = json_cookie.access_token;
        const config = {
            headers:{
                Authorization:`Token ${token}`
            }
        }
        const { data } = await axios.get(`/backend/users-api/users/${json_cookie.user_id}.json`,config);
        this.setState({ profile: data, isLoading: false});
    }
    componentDidMount() {
        this.getProfile();
    }
    
    render() {
        const {profile,isLoading} = this.state;

        if (this.props.pinboard){
            return (<section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-full flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                <div className="flex flex-col sm:flex-row w-11/12 mx-auto p-2 border-2 mt-5">
                    <div className="w-full sm:w-1/2 sm:flex-1 flex flex-col justify-center items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Profile</h1>
                        <div id="profile_image" style={{backgroundImage:`url("${profile.avatar}")`}} className="w-14 h-14 rounded-3xl bg-cover bg-center"></div>
                        <h3 className="text-lg">{profile.first_name}</h3>
                        <p className="text-sm">{profile.bio}</p>
                        <button className="rounded bg-gray-400 text-white font-bold p-1 w-1/2 mt-2">Settings</button>
                    </div>
                    <div className="w-full sm:w-1/2 sm:flex-1 flex flex-col justify-center items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Status</h1>
                        <h3 className="text-lg">Active</h3>
                        <p className="text-sm">{profile.my_todos} To-Do Container</p>
                        <button className="rounded bg-green-400 text-white font-bold p-1 w-1/2 mt-2">Detail</button>
                    </div>
                </div>
                )}
            </section>
                
            )
        } else {
            return (<section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-full flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                <div className="flex flex-col sm:flex-row w-11/12 mx-auto p-2 border-2 mt-5">
                    <div className="w-full sm:w-1/2 sm:flex-1 flex flex-col justify-center items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Profile</h1>
                        <div id="profile_image" style={{backgroundImage:`url("${profile.avatar}")`}} className="w-14 h-14 rounded-3xl bg-cover bg-center"></div>
                        <h3 className="text-lg">{profile.first_name}</h3>
                        <p className="text-sm">{profile.bio}</p>
                        <button className="rounded bg-gray-400 text-white font-bold p-1 w-1/2 mt-2">Add to friends</button>
                    </div>
                    <div className="w-full sm:w-1/2 sm:flex-1 flex flex-col justify-center items-center p-3 border m-1">
                        <h1 className="text-xl font-bold">Status</h1>
                        <h3 className="text-lg">Active</h3>
                        <p className="text-sm">{profile.my_todos} To-Do Container</p>
                        <button className="rounded bg-green-400 text-white font-bold p-1 w-1/2 mt-2">Detail</button>
                    </div>
                </div>
                )}
            </section>
                
            )
        }

    }
    
};

export default Profile;
