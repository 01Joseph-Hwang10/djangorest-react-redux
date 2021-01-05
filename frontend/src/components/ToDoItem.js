import React from 'react';

function ToDoItem(props) {

    return (
        <div className="toDoCard border-b p-3 flex justify-between">
            <h1>{props.to_do_name}</h1>
            <h1>{props.to_do_description}</h1>
            <h1>{props.to_do_completed.toString()}</h1>
            <h1>{props.to_do_order}</h1>
        </div>
    );

};

export default ToDoItem;