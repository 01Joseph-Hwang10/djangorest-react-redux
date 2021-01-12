import React from 'react';
import CSRFToken from '../csrftoken';
import axios from 'axios';

function ToDoCard(props) {

    if(props.pinboard){
        return (
            <div className="toDoCard w-full flex justify-start p-3 border">
                <CSRFToken />
                <h1>{props.todos_name}</h1>
            </div>
        );
    } else {
        return (
            <div className="toDoCard w-full flex justify-between p-3 border">
                <h1>{props.todos_name}</h1>
                <h1>{props.created_username}</h1>
            </div>
        );
    }


};

export default ToDoCard;