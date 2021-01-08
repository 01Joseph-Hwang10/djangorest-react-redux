import axios from 'axios';
import React from 'react';

function ToDoItem(props) {
    

    const updateToDo = (e) => {
        const div = e.target.parentNode.parentNode;
        const originalText = e.target.innerText;
        const button = e.target.parentNode;
        button.style.display = "none";
        const input = document.createElement("input");
        input.value = originalText;
        input.placeholder = "To-Do";
        input.style.width = "100%";
        input.style.textAlign = "center";
        input.style.backgroundColor = "#FCF3CF";
        const form = document.createElement("form")
        form.style.width = "100%";
        form.appendChild(input);
        div.appendChild(form);
    }

    const updateDescripton = (e) => {};

    const updateCompleted = (e) => {};

    const updateOrder = (e) => {};

    const deleteToDo = async (e) => {
        const item = e.target.parentNode.parentNode;
        item.style.display = "none";
        await axios.delete(`/backend/todos-api/todo/${props.id}.json`);
    };

    const col1 = ["r",props.to_do_order,"c1"].join('');
    const col2 = ["r",props.to_do_order,"c2"].join('');
    const col3 = ["r",props.to_do_order,"c3"].join('');
    const col4 = ["r",props.to_do_order,"c4"].join('');

    return (
        <div className="toDoItem border-b p-3 grid grid-cols-5">
            <div className="flex justify-center"><button id={col1} onClick={updateToDo}><h1 className="text-center">{props.to_do_name}</h1></button></div>
            <div className="flex justify-center"><button id={col2} onClick={updateDescripton}><h1 className="text-center">{props.to_do_description}</h1></button></div>
            <div className="flex justify-center"><button id={col3} onClick={updateCompleted}><h1 className="text-center">{props.to_do_completed.toString()}</h1></button></div>
            <div className="flex justify-center"><button id={col4} onClick={updateOrder}><h1 className="text-center">{props.to_do_order}</h1></button></div>
            <div className="w-11/12 mx-auto flex justify-center">
                <button className="text-white font-medium text-center w-1/2 rounded-md mr-px bg-green-500">Detail</button>
                <button className="text-white font-medium text-center w-1/2 rounded-md ml-px bg-red-500" onClick={deleteToDo}>Delete</button>
            </div>
        </div>
    );

};

export default ToDoItem;