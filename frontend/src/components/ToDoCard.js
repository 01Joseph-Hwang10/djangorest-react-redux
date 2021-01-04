import React from 'react';

function ToDoCard(props) {

    return (
        <div className="toDoCard border p-3 flex justify-between">
            <h1>{props.todos_name}</h1>
            <h1>{props.todos_important.toString()}</h1>
        </div>
    );

};

export default ToDoCard;