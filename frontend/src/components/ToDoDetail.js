import React from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import { Link } from 'react-router-dom';

class ToDoDetail extends React.Component {
    state = {
        isLoading: true,
    };
    getToDoItems = async () => {
        const { location } = this.props;
        if (location.state) {
            const { data } = await axios.get(`/backend/todos-api/todo_container/${location.state.id}.json`);
            this.setState({ toDoItems: data.get_todo_items, isLoading: false });
        }
        else {
            const { data } = await axios.get(`/backend/todos-api/todo_container/${window.location.hash.slice(2)}.json`);
            this.setState({ toDoItems: data.get_todo_items, isLoading: false });
        }
    }
    componentDidMount() {
        this.getToDoItems();
    }
    render() {
        const { isLoading, toDoItems } = this.state;
        const { location } = this.props;
        return (<section className="container mx-auto">
            {isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>
            ) : (
                    <div className="w-full">
                        <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-center">
                            <div className="w-1/3 text-left"><Link to='/'>Back to Main</Link></div>
                            <div className="w-1/3"><h1 className="text-center font-semibold text-2xl">{location.state.todos_name}</h1></div>
                            <div className="w-1/3"><h1 className="text-right">{location.state.todos_important.toString()}</h1></div>
                        </div>
                        <div className="toDoDetailBody w-full">
                        <div className="toDoDetailHeader w-full border-b-2 border-gray-400 p-3 grid grid-cols-5">
                            <h1 className="text-center">To-Do</h1>
                            <h1 className="text-center">Description</h1>
                            <h1 className="text-center">Completed?</h1>
                            <h1 className="text-center">Order</h1>
                            <h1 className="text-center">Manage</h1>
                        </div>
                            {
                                toDoItems.map(toDoItem => {
                                    return (
                                        <ToDoItem
                                            key={toDoItem.id}
                                            id={toDoItem.id}
                                            to_do_name={toDoItem.to_do_name}
                                            to_do_description={toDoItem.to_do_description}
                                            to_do_completed={toDoItem.to_do_completed}
                                            to_do_order={toDoItem.to_do_order}
                                        />
                                    )
                                })
                            }
                            <div className="createToDo">
                                <form action="#" method="POST" className="grid grid-cols-5 p-3">
                                    <input className="text-center" placeholder="To-Do"></input>
                                    <input className="text-center" placeholder="description"></input>
                                    <span className="text-center">false</span>
                                    <input className="text-center" placeholder="Order"></input>
                                    <button className="font-bold text-center w-11/12 mx-auto bg-gray-400 rounded-lg text-white">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>

                )
            }
        </section>)
    }
}

export default ToDoDetail;