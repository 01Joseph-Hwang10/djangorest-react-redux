import React from "react";

class Avatar extends React.Component {


    render() {

        return (
            <section className="container w-full">
                <div className="flex justify-start w-full border p-1 h-full">
                    <div className="mr-1 h-10 w-10 bg-center bg-cover rounded-3xl" style={{backgroundImage:`url("${this.props.get_created_by_avatar}")`}}></div>
                    <div className="ml-1 flex flex-col justify-around">
                        <span className="text-xs overflow-hidden">{this.props.created_username}</span>
                        <span className="text-xs overflow-hidden">Individual</span>
                    </div>
                </div>
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