import React from 'react';

function ToDoCard(props) {

    return (
        <div className="toDoCard border p-3 flex center">
            <div className="w-1/2 flex justify-start">
                <h1>{props.todos_name} | </h1>
                <h1>{props.todos_important.toString()}</h1>
            </div>
            <div className="w-1/2 flex justify-end">
                <h1>{props.created_username}</h1>
            </div>

        </div>
    );

};

export default ToDoCard;