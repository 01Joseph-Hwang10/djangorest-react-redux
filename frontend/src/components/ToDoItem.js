import axios from 'axios';
import React from 'react';

function ToDoItem(props) {
    

    const updatePartials = (e) => {
        const div = e.target.parentNode.parentNode;
        const originalText = e.target.innerText;
        const button = e.target.parentNode;
        const buttonNumber = Number(button.id.slice(1,2));
        if (buttonNumber !== 3) {
            button.style.display = "none";
            const input = document.createElement("input");
            input.value = originalText;
            input.placeholder = "Editing...";
            input.style.width = "100%";
            input.style.textAlign = "center";
            input.style.backgroundColor = "#FCF3CF";
            const form = document.createElement("form")
            form.style.width = "100%";
            form.appendChild(input);
            div.appendChild(form);
        }
        switch (buttonNumber) {
            case 1:
                //todo
                return;
            case 2:
                //description
                return;
            case 3:
                //completed?
                return;
            case 4:
                //order
                return;
            default:
                console.log("Something went wrong");
        }
    }

    const deleteToDo = async (e) => {
        const item = e.target.parentNode.parentNode;
        item.style.display = "none";
        await axios.delete(`/backend/todos-api/todo/${props.id}.json`);
    };

    const col1 = ["c1","r",props.to_do_order].join('');
    const col2 = ["c2","r",props.to_do_order].join('');
    const col3 = ["c3","r",props.to_do_order].join('');
    const col4 = ["c4","r",props.to_do_order].join('');

    return (
        <div className="toDoItem border-b p-3 grid grid-cols-5">
            <div className="flex justify-center"><button id={col1} onClick={updatePartials}><h1 className="text-center">{props.to_do_name}</h1></button></div>
            <div className="flex justify-center"><button id={col2} onClick={updatePartials}><h1 className="text-center">{props.to_do_description}</h1></button></div>
            <div className="flex justify-center"><button id={col3} onClick={updatePartials}><h1 className="text-center">{props.to_do_completed.toString()}</h1></button></div>
            <div className="flex justify-center"><button id={col4} onClick={updatePartials}><h1 className="text-center">{props.to_do_order}</h1></button></div>
            <div className="w-11/12 mx-auto flex justify-center">
                <button className="text-white font-medium text-center w-1/2 rounded-md mr-px bg-green-500">Detail</button>
                <button className="text-white font-medium text-center w-1/2 rounded-md ml-px bg-red-500" onClick={deleteToDo}>Delete</button>
            </div>
        </div>
    );

};

export default ToDoItem;