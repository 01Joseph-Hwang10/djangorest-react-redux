import React from 'react';

function ToDoCard(props) {

    return (
        <div className="toDoCard border p-3 flex center">
            <div className="w-1/2 flex justify-start items-center">
                <div><h1>{props.todos_name}</h1></div>
                <div className="mx-1 h-full w-1 bg-black"></div>
                <div><h1>{props.todos_important.toString()}</h1></div>
            </div>
            <div className="w-1/2 flex justify-end">
                <h1>{props.created_username}</h1>
            </div>

        </div>
    );

};

export default ToDoCard;