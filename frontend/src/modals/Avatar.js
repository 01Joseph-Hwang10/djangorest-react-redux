import React from "react";
import axios from 'axios';

class Avatar extends React.Component {

    state = {
        isLoading:true,
    }

    getProfile = async () => {
        const { data } = await axios.get(`/backend/users-api/public_users/${this.props.created_by}.json`);
        this.setState({ profile: data, isLoading: false});
    }
    componentDidMount() {
        this.getProfile();
    }

    render() {
        const {profile, isLoading} = this.state;
        
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-full flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                    <div className="flex justify-center border p-1 h-full">
                        <div className="mr-1 w-5/12 h-full rounded" style={{backgroundImage:`url("${profile.avatar}")`}}></div>
                        <div className="ml-1 flex flex-col justify-around">
                            <span className="text-xs overflow-ellipsis">{this.props.created_username}</span>
                            <span className="text-xs overflow-ellipsis">Individual</span>
                        </div>
                    </div>
                ) }
            </section>
        )
    }


    // return (
    //     <>

    //         <Profile 
    //         isAuthenticated={isAuthenticated}
    //         setIsAuthenticated={setIsAuthenticated}
    //         pinboard={false}
    //         />
    //         <ToDoLists 
    //         isAuthenticated={isAuthenticated}
    //         setIsAuthenticated={setIsAuthenticated}
    //         pinboard={false}
    //         user_id={json_cookie.user_id}
    //         />

    //     </>
    // )
}

export default Avatar;