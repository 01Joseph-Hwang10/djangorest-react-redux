import React from 'react';

function ToDoCard(id, todos_name, todos_important) {

    return (
        <div className="toDoCard border p-3 flex justify-between">
            <h1>{todos_name}</h1>
            <h1>{todos_important}</h1>
        </div>
    );

};

export default ToDoCard;