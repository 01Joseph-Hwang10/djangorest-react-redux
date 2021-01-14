import React from 'react';
import CSRFToken from '../csrftoken';

function ToDoCard(props) {

    return (
        <div className="toDoCard w-full flex justify-start p-3">
            <CSRFToken />
            <h1>{props.todos_name}</h1>
        </div>
    );

};

export default ToDoCard;