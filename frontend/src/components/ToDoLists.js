import React from 'react';
import axios from 'axios';
import json_cookie from '../mixins/cookie';
import CSRFToken from '../csrftoken';
import ToDoContainer from './ToDoContainer';

class ToDoLists extends React.Component {
    state = {
        isLoading: true,
    };
    getToDos = async () => {
        const todo_container_data = await axios.get("/backend/todos-api/public_todo_container.json");
        if (json_cookie && json_cookie.user_id && json_cookie.user_id.length>0){
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
            const filteredToDos = ToDos.sort(sortByImportant);
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
                        
                        <div className="toDos w-11/12 mt-5 mx-auto">
                            {   
                                filteredToDos.map(toDo => {
                                    
                                    return (
                                        <ToDoContainer 
                                        id={toDo.id}
                                        created_by={toDo.created_by}
                                        created_username={toDo.created_username}
                                        todos_name={toDo.todos_name}
                                        todos_important={toDo.todos_important}
                                        todos_description={toDo.todos_description}
                                        get_created_by_avatar={toDo.get_created_by_avatar}
                                        updatePartials={updatePartials}
                                        get_todo_items={toDo.get_todo_items}
                                        pinboard={true}
                                        />
                                        
                                    )
                                })
                            }
                            <div className="w-full mt-8">
                                <form className="toDoCard flex flex-col items-center w-full p-5 border rounded" onSubmit={onSubmit}>
                                    <CSRFToken />
                                    <div className="w-full flex justify-between">
                                        <input placeholder="To-Do Topic" name="todos_name" type="text" className="w-7/12 sm:w-10/12 input1 bg-gray-100 text-left rounded p-1 mx-1"></input>
                                            <div className="w-5/12 sm:w-2/12 flex justify-center items-center mx-1 bg-gray-100 p-1 rounded">
                                                <span className="mr-2 text-gray-400">Important?</span><input name="todos_important" type="checkbox"></input>
                                            </div>
                                    </div>
                                    <div className="w-full p-1 mt-2">
                                        <input placeholder="Description" name="todos_description" type="textarea" className="w-full h-24 input1 bg-gray-100 text-left rounded p-1"></input>
                                    </div>
                                    <div className="w-full p-1 mt-2">
                                        <button className="button1 w-full p-2">Add</button>
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
                    <div className="toDos w-11/12 mt-5 mx-auto">
                    {   
                        filteredToDos.map(toDo => {
                            
                            return (
                                <ToDoContainer 
                                id={toDo.id}
                                created_by={toDo.created_by}
                                created_username={toDo.created_username}
                                todos_name={toDo.todos_name}
                                todos_important={toDo.todos_important}
                                todos_description={toDo.todos_description}
                                get_created_by_avatar={toDo.get_created_by_avatar}
                                get_todo_items={toDo.get_todo_items}
                                pinboard={false}
                                />
                                
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