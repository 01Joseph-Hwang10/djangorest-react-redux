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
        const sortByOrder = (a,b) => {
            if (a.to_do_order < b.to_do_order) {
                return -1;
            }
            if (a.to_do_order > b.to_do_order) {
                return 1;
            }
            return 0;
        };
        if (location.state) {
            const { data } = await axios.get(`/backend/todos-api/todo_container/${location.state.id}.json`);
            this.setState({ toDoItems: data.get_todo_items.sort(sortByOrder), isLoading: false, headElements:[data.todos_name,data.todos_important,location.state.id] });
        }
        else {
            const { data } = await axios.get(`/backend/todos-api/todo_container/${window.location.hash.replace(/\D/g,'')}.json`);
            this.setState({ toDoItems: data.get_todo_items.sort(sortByOrder), isLoading: false, headElements:[data.todos_name,data.todos_important,window.location.hash.replace(/\D/g,'')] });
        }
    }
    componentDidMount() {
        this.getToDoItems();
    }
    render() {
        // const updateList = () => {
        //     this.getToDoItems();
        // };
        const { isLoading, toDoItems, headElements } = this.state;
        const postToDo = async (e) => {
            e.preventDefault();
            const to_do_name = document.getElementById("toDo"),
                to_do_description = document.getElementById("desc"),
                order = document.getElementById("order")
            let post_data;
            if (to_do_name.value) {
                const to_do_belongs=window.location.hash.slice(2);
                let newOrder;
                if (!order.value) {
                    newOrder=toDoItems.length+1;
                } else {
                    newOrder=order.value;
                }

                post_data={
                    to_do_belongs:to_do_belongs,
                    to_do_name:to_do_name.value,
                    to_do_description:to_do_description.value,
                    to_do_order:newOrder
                    };


                const checkResponse = (response) => {
                    while (!response) {
                        if (response) {
                            break;
                        }
                    }
                    this.getToDoItems();
                }

                axios
                .post("/backend/todos-api/todo/",post_data)
                .then(response => checkResponse(response))
                .catch(error => console.log(error));

                to_do_name.value="";
                to_do_description.value="";
                order.value="";

            } else {
                alert("To-Do is required!");
            }
        }



        return (<section className="container mx-auto">
            {isLoading ? (
                <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                    <span className="loader__text text-3xl text-bold text-gray-600">Loading...</span>
                </div>
            ) : (
                    <div className="w-11/12 mt-5 mx-auto border border-gray-300 rounded">
                        <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-center">
                            <div className="w-1/3 text-left"><Link to='/'>Back to Main</Link></div>
                            <div className="w-1/3"><h1 className="text-center font-semibold text-2xl">{headElements[0]}</h1></div>
                            <div className="w-1/3"><h1 className="text-right">{headElements[1].toString()}</h1></div>
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
                                            getToDoItems={this.getToDoItems}
                                        />
                                    )
                                })
                            }
                            <div>
                                <form action="/backend/todos-api/todo/" onSubmit={postToDo} method="POST" className="createToDo grid grid-cols-5 p-3">
                                    <input required type="text" className="text-center" placeholder="To-Do" name="to_do_name" id="toDo"></input>
                                    <input type="text" className="text-center" placeholder="description" name="to_do_description" id="desc"></input>
                                    <span className="text-center">false</span>
                                    <input type="number" className="text-center" placeholder="Order" name="to_do_order" id="order"></input>
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