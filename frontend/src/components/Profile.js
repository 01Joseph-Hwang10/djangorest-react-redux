import React from 'react';
import json_cookie from '../mixins/cookie';
// import CSRFToken from '../csrftoken';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CSRFToken from '../csrftoken';
import Summary from './Summary';

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
            let myProfile;
            if(json_cookie && json_cookie.user_id && json_cookie.user_id.length>0){
                const data1 = await axios.get(`/backend/users-api/public_users/${json_cookie.user_id}.json`);
                myProfile = data1.data;
            }
            const data2 = await axios.get(`/backend/users-api/public_users/${id}.json`);
            if (myProfile && myProfile.following.includes(data2.data.id)){
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

        const notAvailable = () => {
            alert("Currently not available... Sorry :/");
        }

        if (this.props.pinboard){
            return (<section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-full flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                <>
                <div className="flex flex-col w-11/12 mx-auto p-2 border shadow-lg border-blue-100 mt-5 bg-blue-50 rounded-xl">
                <div className="w-full flex justify-center items-center mt-2 mb-4"><span className="font-bold text-gray-700 text-2xl">Profile</span></div>
                    <div className="text-gray-800 flex flex-col sm:flex-row ">
                        <div className="flex flex-col sm:flex-auto w-full sm:w-1/2">
                            <div className="m-2 sm:m-0 sm:mx-2 sm:my-2 flex flex-col h-full justify-center items-center p-3 border bg-blue-100 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold mb-1">Profile</h1>
                                <div id="profile_image" style={{backgroundImage:`url("${profile.avatar}")`}} className="w-14 h-14 rounded-3xl bg-cover bg-center"></div>
                                <h3 className="text-lg my-0 py-1">{profile.first_name}</h3>
                                <p className="text-sm my-0 py-1">{profile.bio}</p>
                                <button className="button1 p-1 w-1/2 mt-2 text-white my-0 py-1"><Link to={{
                                    pathname:`/pinboard/${profile.id}/setttings`,
                                    state: {
                                        nickname:profile.first_name,
                                        bio:profile.bio,
                                        avatar:profile.avatar,
                                        user_id:json_cookie.user_id
                                    }
                                    }}><span className="text-white block w-full p-1">Settings</span></Link></button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-auto w-full sm:w-1/2">
                            <div className="m-2 sm:m-0 mt-3 sm:my-2 sm:mx-2 flex flex-col justify-center items-center p-3 border bg-blue-200 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold my-0 py-1">Status</h1>
                                <h3 className="text-lg text-green-400 font-bold my-0 py-1">Active</h3>
                                <p className="text-sm">{profile.my_todos} To-Do Container</p>
                                <button className="rounded bg-indigo-600 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>More...</button>
                            </div>
                            <div className="m-2 sm:m-0 mt-3 sm:my-2 sm:mx-2 flex flex-col justify-center items-center p-3 border mt-2 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold my-0 py-1">Social</h1>
                                <h4 className="text-sm my-0 py-1">{profile.followers_count} Followers</h4>
                                <button className="rounded bg-blue-400 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Summary 
                user_project_name={profile.user_project_name}
                user_project_description={profile.user_project_description}
                user_project_tags={profile.user_project_tags}
                pinboard={true}
                isAuthenticated={this.props.isAuthenticated}
                />
                </>
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
                        data.data=false;
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
                    <>
                <div className="flex flex-col w-11/12 mx-auto p-2 border shadow-lg border-blue-100 mt-5 bg-blue-50 rounded-xl">
                <div className="w-full flex justify-center items-center mt-2 mb-4"><span className="font-bold text-gray-700 text-2xl">Profile</span></div>
                    <div className="text-gray-800 flex flex-col sm:flex-row ">
                        <div className="flex flex-col sm:flex-auto w-full sm:w-1/2">
                            <div className="m-2 sm:m-0 sm:mx-2 sm:my-2 flex flex-col h-full justify-center items-center p-3 border bg-blue-100 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold mb-1">Profile</h1>
                                <div id="profile_image" style={{backgroundImage:`url("${profile.avatar}")`}} className="w-14 h-14 rounded-3xl bg-cover bg-center"></div>
                                <h3 className="text-lg my-0 py-1">{profile.first_name}</h3>
                                <p className="text-sm my-0 py-1">{profile.bio}</p>
                                <CSRFToken />
                                <button id="switchFollow" className="rounded text-white font-bold p-1 w-1/2 mt-2" style={{backgroundColor:this.state.followColor}} onClick={switchFollow}>{this.state.followStatus}</button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-auto w-full sm:w-1/2">
                            <div className="m-2 sm:m-0 mt-3 sm:my-2 sm:mx-2 flex flex-col justify-center items-center p-3 border bg-blue-200 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold my-0 py-1">Status</h1>
                                <h3 className="text-lg text-green-400 font-bold my-0 py-1">Active</h3>
                                <p className="text-sm">{profile.my_todos} To-Do Container</p>
                                <button className="rounded bg-indigo-600 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>More...</button>
                            </div>
                            <div className="m-2 sm:m-0 mt-3 sm:my-2 sm:mx-2 flex flex-col justify-center items-center p-3 border mt-2 rounded-lg shadow-md">
                                <h1 className="text-xl font-bold my-0 py-1">Social</h1>
                                <h4 className="text-sm my-0 py-1">{profile.followers_count} Followers</h4>
                                <button className="rounded bg-blue-400 text-white font-bold p-1 w-1/2 mt-2" onClick={notAvailable}>Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Summary 
                project_name={profile.user_project_name}
                project_description={profile.user_project_description}
                pinboard={false}
                />
                </>
                )}
            </section>
                
            )
        }

    }
    
};

export default Profile;
