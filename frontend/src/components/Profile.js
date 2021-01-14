import React from 'react';
import json_cookie from '../routes/auth/cookie';
// import CSRFToken from '../csrftoken';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CSRFToken from '../csrftoken';

class Profile extends React.Component {
    state={
        isLoading:true,
    };
    getProfile = async () => {
        if (this.props.pinboard){
            const { data } = await axios.get(`/backend/users-api/public_users/${json_cookie.user_id}.json`);
            this.setState({ profile: data, isLoading: false});
        } else {
            const id=window.location.hash.replace(/\D/g,'');
            const data1 = await axios.get(`/backend/users-api/public_users/${json_cookie.user_id}.json`);
            const myProfile = data1.data;
            const data2 = await axios.get(`/backend/users-api/public_users/${id}.json`);
            if (myProfile.following.includes(data2.data.id)){
                this.setState({ profile: data2.data, isLoading: false,followStatus:"Following",followColor:"#9CA3AF"});
            } else {
                this.setState({ profile: data2.data, isLoading: false,followStatus:"Follow",followColor:"#60A5FA"});
            }
        }
    }
    // let isFollowing="Follow";
    // let followColor= "#60A5FA";
    // if(profile && myProfile && profile.id in myProfile.following) {
    //     isFollowing="Following";
    //     followColor="#9CA3AF";
    // } 
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
                        <button className="button1 p-1 w-1/2 mt-2"><Link to={{
                            pathname:`/pinboard/${profile.id}/setttings`,
                            state: {
                                nickname:profile.first_name,
                                bio:profile.bio,
                                avatar:profile.avatar,
                                user_id:json_cookie.user_id
                            }
                            }}>Settings</Link></button>
                    </div>
                    <div className="flex flex-col sm:flex-1 w-full sm:w-1/2">
                        <div className="flex flex-col justify-center items-center p-3 border m-1">
                            <h1 className="text-xl font-bold">Status</h1>
                            <h3 className="text-lg">Active</h3>
                            <p className="text-sm">{profile.my_todos} To-Do Container</p>
                            <button className="rounded bg-green-400 text-white font-bold p-1 w-1/2 mt-2">More...</button>
                        </div>
                        <div className="flex flex-col justify-center items-center p-3 border m-1 mt-2">
                            <h1 className="text-xl font-bold">Social</h1>
                            <h4 className="text-sm">{profile.following_count} Following</h4>
                            <button className="rounded bg-red-400 text-white font-bold p-1 w-1/2 mt-2">Detail</button>
                        </div>
                    </div>
                </div>
                )}
            </section>
                
            )
        } else {

            const switchFollow = () => {
                if(json_cookie.user_id.length > 0 && json_cookie.access_token.length >0) {
                    const button = document.getElementById("switchFollow");
                    let currentState = button.innerText;
                    const checkResponse = (response) => {
                        while (!response) {
                            if (response) {
                                break;
                            }
                        }
                        this.getProfile();
                    }
                    let data = {
                        following:profile.id,
                        id:json_cookie.user_id
                    }
                    const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                    if(csrftoken.value) {
                        data.csrfmiddlewaretoken = csrftoken.value;
                    } else {
                        data.csrfmiddlewaretoken = false;
                    }
                    const config = {
                        headers:{
                            Authorization:`Token ${json_cookie.access_token}`
                        }
                    }
                    if(currentState==="Follow") {
                        data.data=true;
                        axios
                        .patch(`/backend/users-api/users/${json_cookie.user_id}/`,data,config)
                        .then(response=>checkResponse(response))
                        .catch(error=>console.log(error));
                        button.innerText = "Following";
                        button.style.backgroundColor = "#9CA3AF";
                    } else {
                        data.data=true;
                        axios
                        .patch(`/backend/users-api/users/${json_cookie.user_id}/`,data,config)
                        .then(response=>checkResponse(response))
                        .catch(error=>console.log(error));
                        button.innerText = "Follow";
                        button.style.backgroundColor = "#60A5FA";
                    }
                }
            };


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
                        <CSRFToken />
                        <button id="switchFollow" className="rounded text-white font-bold p-1 w-1/2 mt-2" style={{backgroundColor:this.state.followColor}} onClick={switchFollow}>{this.state.followStatus}</button>
                    </div>
                    <div className="flex flex-col sm:flex-1 w-full sm:w-1/2">
                        <div className="flex flex-col justify-center items-center p-3 border m-1">
                            <h1 className="text-xl font-bold">Status</h1>
                            <h3 className="text-lg">Active</h3>
                            <p className="text-sm">{profile.my_todos} To-Do Container</p>
                            <button className="rounded bg-green-400 text-white font-bold p-1 w-1/2 mt-2">More...</button>
                        </div>
                        <div className="flex flex-col justify-center items-center p-3 border m-1 mt-2">
                            <h1 className="text-xl font-bold">Social</h1>
                            <h4 className="text-sm">{profile.following_count} Following</h4>
                            <button className="rounded bg-red-400 text-white font-bold p-1 w-1/2 mt-2">Detail</button>
                        </div>
                    </div>
                </div>
                )}
            </section>
                
            )
        }

    }
    
};

export default Profile;
