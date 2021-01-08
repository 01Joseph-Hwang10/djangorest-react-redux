import React from 'react';

function ToDoItem(props) {

    return (
        <div className="toDoCard border-b p-3 grid grid-cols-5">
            <div><h1 className="text-center">{props.to_do_name}</h1></div>
            <div><h1 className="text-center">{props.to_do_description}</h1></div>
            <div><h1 className="text-center">{props.to_do_completed.toString()}</h1></div>
            <div><h1 className="text-center">{props.to_do_order}</h1></div>
            <div className="w-full">
                <button className="font-bold text-center w-1/2 rounded-md mr-px bg-green-400">Edit</button>
                <button className="font-bold text-center w-1/2 rounded-md ml-px bg-red-400">Delete</button>
            </div>
        </div>
    );

};

export default ToDoItem;