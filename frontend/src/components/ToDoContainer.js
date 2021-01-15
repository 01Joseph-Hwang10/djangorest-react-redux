import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../modals/Avatar';
import ToDoCard from './ToDoCard';
// import CSRFToken from '../csrftoken';


function ToDoContainer(props) {

    if(props.pinboard) {
        return (
        <div className="w-full flex flex-col items-center bg-blue-50 rounded-lg shadow-lg my-3">
            <div className="w-full flex items-center justify-between">
                <div className="w-2/12"></div>
                <div className="w-8/12 flex justify-center">
                    <Link
                        to={{
                            pathname: `/detail/${props.id}/`,
                            state: {
                                key: props.id,
                                id: props.id,
                                created_by: props.created_by,
                                todos_name: props.todos_name,
                                todos_important: props.todos_important
                            }
                        }}>
                        <span className="block w-full py-2 font-bold text-2xl text-gray-700">{props.todos_name}</span>
                    </Link>
                </div>
                <div className="w-2/12 flex justify-center p-3 flex flex-col">
                    <button className="button1 bg-gray-300 text-gray-500 px-1" onClick={props.updatePartials}>{props.todos_important.toString()}</button>
                </div>
            </div>
            <div className="w-full rounded-lg bg-indigo-100">
                <div className="flex justify-between items-center w-full p-3">
                    <div className="flex flex-col items-start w-1/2 sm:w-1/3">
                        <h5 className="font-semibold mb-2">Description</h5>
                        <p className="overflow-hidden">{props.todos_description}</p>
                    </div>
                    <div className="w-1/2 sm:w-1/3 bg-blue-200 p-2 rounded">
                        <h5>Contributors</h5>
                        <Link to={{
                                pathname:`/user_profile/${props.created_by}`
                            }}>
                            <Avatar 
                            get_created_by_avatar={props.get_created_by_avatar}
                            created_username={props.created_username}
                            />
                            </Link>
                    </div>
                </div>
                <div className="p-1 w-full">
                    <div className="bg-blue-200 rounded-lg w-full">
                        <Link
                            to={{
                                pathname: `/detail/${props.id}/`,
                                state: {
                                    key: props.id,
                                    id: props.id,
                                    created_by: props.created_by,
                                    todos_name: props.todos_name,
                                    todos_important: props.todos_important
                                }
                            }}>
                            <span className="block text-center py-1 font-semibold text-xl w-full text-green-500">Detail</span>
                        </Link>
                        <div className="bg-indigo-200 rounded-lg mt-2 shadow-inner p-2 flex justify-center items-center">
                            {
                                props.get_todo_items.map(toDo => {
                                    return (
                                        <div className="w-1/3 m-2">
                                            <ToDoCard 
                                            to_do_belongs={toDo.to_do_belongs}
                                            to_do_name={toDo.to_do_name}
                                            to_do_description={toDo.to_do_description}
                                            to_do_order={toDo.to_do_order}
                                            to_do_completed={toDo.to_do_completed}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    } else {
        return (
            <div className="w-full flex flex-col items-center bg-blue-50 rounded-lg shadow-lg my-3">
                <div className="w-full flex items-center justify-between">
                    <div className="w-2/12"></div>
                    <div className="w-8/12 flex justify-center">
                        <Link
                            to={{
                                pathname: `/detail/${props.id}/`,
                                state: {
                                    key: props.id,
                                    id: props.id,
                                    created_by: props.created_by,
                                    todos_name: props.todos_name,
                                    todos_important: props.todos_important
                                }
                            }}>
                            <span className="block w-full py-2 font-bold text-2xl text-gray-700">{props.todos_name}</span>
                        </Link>
                    </div>
                    <div className="w-2/12 flex justify-center p-3 flex flex-col">
                        <span className="button1 bg-gray-300 text-gray-500 px-1">{props.todos_important.toString()}</span>
                    </div>
                </div>
                <div className="w-full rounded-lg bg-indigo-100">
                    <div className="flex justify-between items-center w-full p-3">
                        <div className="flex flex-col items-start w-1/2 sm:w-1/3">
                            <h5 className="font-semibold mb-2">Description</h5>
                            <p className="overflow-hidden">{props.todos_description}</p>
                        </div>
                        <div className="w-1/2 sm:w-1/3 bg-blue-200 p-2 rounded">
                            <h5>Contributors</h5>
                            <Link to={{
                                pathname:`/user_profile/${props.created_by}`
                            }}>
                            <Avatar 
                            get_created_by_avatar={props.get_created_by_avatar}
                            created_username={props.created_username}
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="p-1 w-full">
                        <div className="bg-blue-200 rounded-lg w-full">
                            <Link
                                to={{
                                    pathname: `/detail/${props.id}/`,
                                    state: {
                                        key: props.id,
                                        id: props.id,
                                        created_by: props.created_by,
                                        todos_name: props.todos_name,
                                        todos_important: props.todos_important
                                    }
                                }}>
                                <span className="block text-center py-1 font-semibold text-xl w-full text-green-500">Detail</span>
                            </Link>
                            <div className="bg-indigo-200 rounded-lg mt-2 shadow-inner p-2 flex justify-center items-center">
                                {
                                    props.get_todo_items.map(toDo => {
                                        return (
                                            <div className="w-1/3 m-2">
                                                <ToDoCard 
                                                to_do_belongs={toDo.to_do_belongs}
                                                to_do_name={toDo.to_do_name}
                                                to_do_description={toDo.to_do_description}
                                                to_do_order={toDo.to_do_order}
                                                to_do_completed={toDo.to_do_completed}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }


};

export default ToDoContainer;