import React from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard';
import { Link } from 'react-router-dom';
import json_cookie from '../routes/auth/cookie';
import CSRFToken from '../csrftoken';

class ToDoLists extends React.Component {
    state = {
        isLoading: true,
    };
    getToDos = async () => {
        const { data } = await axios.get("/backend/todos-api/todo_container.json");
        this.setState({ toDos: data.results, isLoading: false, toDosCount:data.results.length });
    }
    componentDidMount() {
        this.getToDos();
    }
    render() {
        const { isLoading, toDos, toDosCount } = this.state;
        if (this.props.pinboard && toDos && this.props.isAuthenticated && json_cookie.user_id) {
            const user_id = json_cookie.user_id;
            const filteredToDos = toDos.filter(toDo=>toDo.created_by===Number(user_id));
            const onSubmit = (e) => {
                e.preventDefault();
                const todos_name = document.getElementsByName("todos_name")[0];
                const todos_important = document.getElementsByName("todos_important")[0];
                const created_by = user_id;
                // const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                const post_data = {
                    todos_name:todos_name.value,
                    todos_important:todos_important.value,
                    created_by:created_by,
                    // csrftoken:csrftoken.value
                };
                const checkResponse = (response) => {
                    while (!response) {
                        if (response) {
                            break;
                        }
                    }
                    this.getToDos();
                }
                axios
                .post('/backend/todos-api/todo_container/',post_data)
                .then(response => checkResponse(response))
                .catch(error => console.log(error));
                
                todos_name.value="";
            };


            return (<section className="container">
                {isLoading ? (
                    <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                    </div>
                ) : (
                        
                        <div className="toDos w-11/12 mt-5 border rounded mx-auto">
                            <div className="toDoDetailHeader w-full border-b-2 border-black flex">
                                <div className="flex justify-between w-11/12 p-3">
                                    <h1>To-Do</h1>
                                    <h1>Made by</h1>
                                </div>
                                <div className="felx justify-center w-1/12 p-3">
                                    <h1>Star</h1>
                                </div>
                            </div>
                            {   
                                filteredToDos.map(toDo => {
                                    
                                    return (
                                        <div className="flex items-center">
                                            <div className="w-11/12">
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
                                                    />
                                                </Link>
                                            </div>
                                            <div className="w-1/12 flex justify-center border p-3">
                                                <span>{toDo.todos_important.toString()}</span>
                                            </div>
                                        </div>
                                        
                                    )
                                })
                            }
                            <div className="w-full">
                                <form className="toDoCard border flex items-center w-full" onSubmit={onSubmit}>
                                    <CSRFToken />
                                    <div className="w-11/12 flex justify-between p-3 border">
                                        <input placeholder="To-Do Topic" name="todos_name" type="text" className="input1 bg-gray-100 text-left rounded p-1"></input>
                                        <button className="bg-gray-400 rounded text-white font-bold w-32 p-1">Add</button>
                                    </div>
                                    <div className="w-1/12 flex justify-center">
                                        <input name="todos_important" type="checkbox"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </section>)
        } else {
            return (<section className="container">
            {isLoading ? (
                <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                    <span className="loader__text text-2xl text-gray-600 font-bold">Loading...</span>
                </div>
            ) : (
                    <div className="toDos w-11/12 mt-5 border rounded mx-auto">
                        <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-between">
                            <h1>To-Do</h1>
                            <h1>Made by</h1>
                        </div>
                        {
                            toDos.map(toDo => {
                                return (
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