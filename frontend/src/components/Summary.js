import React from 'react';
import { Link } from 'react-router-dom';
import json_cookie from '../mixins/cookie';

function Summary(props) {

    const notAvailable = (e) => {
        e.preventDefault();
        alert("Currently not available... Sorry :/");
        e.target.childNodes[0].value=""
    }
    
    if (props.pinboard) {
        return (
            <>
            <div className="w-11/12 mx-auto bg-blue-50 rounded-xl shadow-lg mt-3 p-4 flex flex-col">
                <div className="w-full mb-5 flex justify-center items-center"><span className="text-2xl font-bold text-gray-700">Project Summary</span></div>
                <div className="flex flex-col sm:flex-row justify-center">
                    <div className="flex flex-col flex-1 sm:mr-1">
                        <div className="w-full flex flex-col items-center mb-2 sm:my-0 sm:mr-2 p-3 mx-auto bg-indigo-300 rounded-lg shadow-md">
                            <div className="font-bold text-xl">{props.user_project_name}</div>
                            <div className="mt-2"><span>Status: </span><span className="font-bold text-green-500">Active</span></div>
                            <div className="mt-2">Contributors : Individual</div>
                            <Link to={{
                                pathname:`/pinboard/${json_cookie.user_id}/project_settings`,
                                state:{
                                    isAuthenticated:props.isAuthenticated,
                                    user_project_name:props.user_project_name,
                                    user_project_description:props.user_project_description,
                                    user_project_tags:props.user_project_tags,
                                    }}}><button className="button1 py-1 px-8 mt-2">Project Settings</button></Link>
                        </div>
                        <div className="w-full h-full mt-2 bg-blue-300 rounded-lg p-2 sm:mt-3 flex flex-col items-center">
                            <h3 className="font-bold text-gray-50 mb-2">Tags</h3>
                            <div id="tags" className="mb-2"></div>
                            <form className="flex justify-center" onSubmit={notAvailable}>
                                <input className="w-5/6 mx-auto p-1 rounded text-left input bg-blue-200 border border-blue-100" placeholder="New Tags"></input>
                            </form>
                        </div>

                    </div>
                    <div className="w-full flex flex-col items-center flex-1 sm:w-1/2 sm:ml-2 mt-4 sm:my-0 sm:ml-2 p-3 mx-auto bg-indigo-200 rounded-lg shadow-md">
                        <div className="font-bold text-xl">Description</div>
                        <div className="my-2 text-center">{props.user_project_description}</div>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div className="w-11/12 mx-auto bg-blue-50 rounded-xl shadow-lg mt-3 p-4 flex flex-col">
                <div className="w-full mb-5 flex justify-center items-center"><span className="text-2xl font-bold text-gray-700">Project Summary</span></div>
                <div className="flex flex-col sm:flex-row justify-center">
                    <div className="flex flex-col flex-1 sm:mr-1">
                        <div className="w-full flex flex-col items-center mb-2 sm:my-0 sm:mr-2 p-3 mx-auto bg-indigo-300 rounded-lg shadow-md">
                            <div className="font-bold text-xl">{props.user_project_name}</div>
                            <div className="mt-2"><span>Status: </span><span className="font-bold text-green-500">Active</span></div>
                            <div className="mt-2">Contributors : Individual</div>
                        </div>
                        <div className="w-full h-full mt-2 bg-blue-300 rounded-lg p-2 sm:mt-3 flex flex-col items-center">
                            <h3 className="font-bold text-gray-50 mb-2">Tags</h3>
                            <div id="tags" className="mb-2"></div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center flex-1 sm:w-1/2 sm:ml-2 mt-4 sm:my-0 sm:ml-2 p-3 mx-auto bg-indigo-200 rounded-lg shadow-md">
                        <div className="font-bold text-xl">Description</div>
                        <div className="my-2 text-center">{props.user_project_description}</div>
                    </div>
                </div>
            </div>
            </>
        )
    }

}

export default Summary;