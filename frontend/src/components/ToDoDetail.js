import React from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';

class ToDoDetail extends React.Component {
    state = {
        isLoading: true,
        toDoItems: []
    };
    getToDoItems = async () => {
        const { location } = this.props;
        const { data } = await axios.get(`/backend/todos-api/todo_container/${location.state.id}.json`);
        // let sortedToDoItems = JSON.parse(data.get_todo_items);
        console.log(data.get_todo_items)
        this.setState({ toDoItems: data.get_todo_items, isLoading: false });
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
                        <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-between">
                            <h1>{location.state.todos_name}</h1>
                            <h1>{location.state.todos_important.toString()}</h1>
                        </div>
                        <div className="toDoDetailBody w-full">
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
                                <form action="#" method="POST">
                                    <input placeholder="To-Do"></input>
                                    <input placeholder="description"></input>
                                </form>
                                <button>Create New ToDo</button>
                            </div>
                        </div>
                    </div>

                )
            }
        </section>)
    }
}

export default ToDoDetail;