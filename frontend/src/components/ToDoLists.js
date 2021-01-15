import React from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard';
import { Link } from 'react-router-dom';
import json_cookie from '../routes/auth/cookie';
import CSRFToken from '../csrftoken';
import Avatar from '../modals/Avatar';

class ToDoLists extends React.Component {
    state = {
        isLoading: true,
    };
    getToDos = async () => {
        const todo_container_data = await axios.get("/backend/todos-api/public_todo_container.json");
        if (json_cookie && json_cookie.user_id.length>0){
            const user_data = await axios.get(`/backend/users-api/public_users/${json_cookie.user_id}`)
            this.setState({ toDos: todo_container_data.data.results, isLoading: false, profile:user_data.data});
        } else {
            this.setState({ toDos: todo_container_data.data.results, isLoading: false});
        }
    }
    componentDidMount() {
        this.getToDos();
    }
    render() {
        let profile;
        const { isLoading, toDos } = this.state;
        if (this.state.profile) profile = this.state.profile;
        const checkResponse = (response) => {
            while (!response) {
                if (response) {
                    break;
                }
            }
            this.getToDos();
        }
        if (this.props.pinboard && toDos && this.props.isAuthenticated && json_cookie.user_id) {
            const user_id = json_cookie.user_id;
            const ToDos = toDos.filter(toDo=>toDo.created_by===Number(user_id));
            const sortByImportant = (a,b) => {
                if (a.todos_important && !b.todos_important) {
                    return -1;
                }
                if (!a.todos_important && b.todos_important) {
                    return 1;
                }
                return 0;
            };
            filteredToDos = ToDos.sort(sortByImportant);
            const onSubmit = (e) => {
                e.preventDefault();
                const todos_name = document.getElementsByName("todos_name")[0];
                const todos_important = document.getElementsByName("todos_important")[0];
                const created_by = user_id;
                const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                let post_data = {
                    todos_name:todos_name.value,
                    created_by:created_by
                };
                if (todos_important.checked) {
                    post_data.todos_important = true;
                } else {
                    post_data.todos_important = false;
                }
                if(csrftoken.value) {
                    post_data.csrfmiddlewaretoken = csrftoken.value;
                } else {
                    post_data.csrfmiddlewaretoken = false;
                }
                let token;
                if(json_cookie.access_token) token = json_cookie.access_token;
                const config = {
                    headers:{
                        Authorization:`Token ${token}`
                    }
                }
                axios
                .post('/backend/todos-api/todo_container/',post_data,config)
                .then(response => checkResponse(response))
                .catch(error => console.log(error));
                
                todos_name.value="";
                todos_important.checked=false;
            };

            const updatePartials = (e) => {
                const currentState = e.target.innerText;
                const id = e.target.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute("href").replace(/\D/g,'');
                const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                const switchTo = async (switchto) => {
                    let data = {
                        data:switchto,
                        id:id,
                        type:"todos_important"
                    }
                    if(csrftoken.value) {
                        data.csrfmiddlewaretoken = csrftoken.value;
                    } else {
                        data.csrfmiddlewaretoken = false;
                    }
                    // const config = {
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //         'X-CSRFToken': csrftoken
                    //       }
                    // }
                    let token;
                    if(json_cookie.access_token) token = json_cookie.access_token;
                    const config = {
                        headers:{
                            Authorization:`Token ${token}`
                        }
                    }
                    await axios
                    .patch(`/backend/todos-api/todo_container/${id}.json`,data,config)
                    .then(response => checkResponse(response))
                    .catch(error => console.log(error));
                    }
                if(currentState.length < 5) {
                    switchTo(false);
                } else {
                    switchTo(true);
                }
                
            };
            


            return (<section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                        
                        <div className="toDos w-11/12 mt-5 border rounded mx-auto">
                            <div className="toDoDetailHeader w-full border-b-2 border-black flex">
                                <div className="flex justify-start w-10/12 p-3">
                                    <h1>To-Do</h1>
                                </div>
                                <div className="flex justify-center w-2/12 p-3">
                                    <h1>Star</h1>
                                </div>
                            </div>
                            {   
                                filteredToDos.map(toDo => {
                                    
                                    return (
                                        <div className="flex items-center">
                                            <div className="w-10/12">
                                                <Link
                                                    to={{
                                                        pathname: `/detail/${toDo.id}/`,
                                                        state: {
                                                            key: toDo.id,
                                                            id: toDo.id,
                                                            created_by: toDo.created_by,
                                                            todos_name: toDo.todos_name,
                                                            todos_important: toDo.todos_important
                                                        }
                                                    }}>
                                                    <ToDoCard
                                                        key={toDo.id}
                                                        id={toDo.id}
                                                        created_username={toDo.created_username}
                                                        todos_name={toDo.todos_name}
                                                        todos_important={toDo.todos_important}
                                                        pinboard={true}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="w-2/12 flex justify-center border p-3">
                                                <button onClick={updatePartials}>{toDo.todos_important.toString()}</button >
                                            </div>
                                        </div>
                                        
                                    )
                                })
                            }
                            <div className="w-full">
                                <form className="toDoCard border flex items-center w-full" onSubmit={onSubmit}>
                                    <CSRFToken />
                                    <div className="w-10/12 flex justify-between p-3 border">
                                        <input placeholder="To-Do Topic" name="todos_name" type="text" className="input1 w-11/12 bg-gray-100 text-left rounded p-1"></input>
                                        <button className="button1 w-32 p-1">Add</button>
                                    </div>
                                    <div className="w-2/12 flex justify-center">
                                        <input name="todos_important" type="checkbox"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </section>)
        } else {
            const created_by = window.location.hash.replace(/\D/g,'');
            let filteredToDos;
            if (toDos && created_by.length > 0) {
                filteredToDos = toDos.filter(toDo=>toDo.created_by===Number(created_by));
            } else {
                if(profile){
                    const sortByFollowing = (a,b) => {
                        if (profile.following.includes(a.created_by) && !profile.following.includes(b.created_by)) {
                            return -1;
                        }
                        if (!profile.following.includes(a.created_by) && profile.following.includes(b.created_by)) {
                            return 1;
                        }
                        return 0;
                    };
                    filteredToDos = toDos.sort(sortByFollowing);
                } else {
                    filteredToDos = toDos;
                }
            }
            return (<section className="container">
            {isLoading ? (
                <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                    <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                </div>
            ) : (
                    <div className="toDos w-11/12 mt-5 border rounded mx-auto">
                        <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-between">
                            <div className="w-7/12 sm:w-9/12"><h1>To-Do</h1></div>
                            <div className="w-5/12 sm:w-3/12 flex justify-center items-center"><h1>Made by</h1></div>
                        </div>
                        {
                            filteredToDos.map(toDo => {
                                return (
                                    <div className="flex items-center border">
                                        <div className="w-7/12 sm:w-9/12 p-1">
                                            <Link
                                                to={{
                                                    pathname: `/detail/${toDo.id}/`,
                                                    state: {
                                                        key: toDo.id,
                                                        id: toDo.id,
                                                        created_by: toDo.created_by,
                                                        todos_name: toDo.todos_name,
                                                        todos_important: toDo.todos_important
                                                    }
                                                }}>
                                                <ToDoCard
                                                    key={toDo.id}
                                                    id={toDo.id}
                                                    created_username={toDo.created_username}
                                                    todos_name={toDo.todos_name}
                                                    todos_important={toDo.todos_important}
                                                    pinboard={false}
                                                />
                                            </Link>
                                        </div>
                                        <div className="w-5/12 sm:w-3/12 p-1">
                                            <Link to={{
                                                pathname:`/user_profile/${toDo.created_by}`,
                                                state:{
                                                    created_by:toDo.created_by
                                                }
                                                }}>
                                                <Avatar 
                                                key={toDo.created_by}
                                                id={toDo.created_by}
                                                created_username={toDo.created_username}
                                                created_by={toDo.created_by}
                                                get_created_by_avatar={toDo.get_created_by_avatar}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </section>)
        }
    }
}

export default ToDoLists;