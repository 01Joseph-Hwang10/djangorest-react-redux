import React from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard';
import { Link } from 'react-router-dom';
import json_cookie from '../routes/auth/cookie';

class ToDoLists extends React.Component {
    state = {
        isLoading: true,
    };
    getToDos = async () => {
        const { data } = await axios.get("/backend/todos-api/todo_container.json");
        this.setState({ toDos: data.results, isLoading: false });
    }
    componentDidMount() {
        this.getToDos();
    }
    render() {
        let { isLoading, toDos } = this.state;
        if (this.props.pinboard && toDos && this.props.isAuthenticated && json_cookie.user_id) {
            const user_id = json_cookie.user_id;
            toDos = toDos.filter(toDo=>toDo.created_by===user_id);
            console.log(toDos);
        }
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
                                            pathname: `/detail/${toDo.id}`,
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
                                )
                            })
                        }
                    </div>
                )
            }
        </section>)
    }
}

export default ToDoLists;