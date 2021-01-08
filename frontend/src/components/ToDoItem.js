import axios from 'axios';
import React from 'react';

function ToDoItem(props) {
    
    const checkResponse = (response) => {
        while (!response) {
            if (response) {
                break;
            }
        }
        props.getToDoItems();
    }

    const updatePartials = (e) => {
        const patchToDo = async (form,data,button) => {
            data.id=Number(props.id);
            form.addEventListener("submit",async function(){
                await axios
                .patch(`/backend/todos-api/todo/${props.id}.json`,data)
                .then(response => checkResponse(response))
                .catch(error => console.log(error));
                form.remove();
                button.style.display = "block";
            })
        }
        const button = e.target.parentNode;
        const buttonNumber = Number(button.id.slice(1,2));
        const currentState = e.target.innerText;
        if (buttonNumber !== 3) {
            const div = e.target.parentNode.parentNode;
            button.style.display = "none";
            const input = document.createElement("input");
            input.value = currentState;
            input.style.width = "100%";
            input.style.textAlign = "center";
            input.style.backgroundColor = "#FCF3CF";
            const form = document.createElement("form")
            form.style.width = "100%";
            form.appendChild(input);
            div.appendChild(form);
            switch (buttonNumber) {
                case 1:
                    input.placeholder= "To-Do";
                    input.name="to_do_name";
                    patchToDo(form,{to_do_name:input.value,type:"to_do_name"},button)
                    return;
                case 2:
                    input.placeholder= "Description";
                    input.name="to_do_description";
                    patchToDo(form,{to_do_description:input.value,type:"to_do_description"},button)
                    return;
                case 4:
                    input.placeholder= "Order";
                    input.name="to_do_order";
                    patchToDo(form,{to_do_order:input.value,type:"to_do_order"},button)
                    return;
                default:
                    console.log("Something went wrong");
            }
        } else if (buttonNumber===3) {
            const patchBool = async (switchto) => {
                await axios
                .patch(
                    `/backend/todos-api/todo/${props.id}.json`,
                    {to_do_completed:Boolean(switchto)}
                )
                .then(response => checkResponse(response))
                .catch(error => console.log(error));
            }
            if (currentState==="false"){
                patchBool(true);
            } else {
                patchBool(false);
            }
        }
    }

    const deleteToDo = async () => {

        await axios
                .delete(`/backend/todos-api/todo/${props.id}.json`)
                .then(response => checkResponse(response))
                .catch(error => console.log(error));
    };

    const col1 = ["c1","r",props.to_do_order].join('');
    const col2 = ["c2","r",props.to_do_order].join('');
    const col3 = ["c3","r",props.to_do_order].join('');
    const col4 = ["c4","r",props.to_do_order].join('');

    return (
        <div className="toDoItem border-b p-3 grid grid-cols-5">
            <div className="flex justify-center"><button className="w-full" id={col1} onClick={updatePartials}><h1 className="text-center">{props.to_do_name}</h1></button></div>
            <div className="flex justify-center"><button className="w-full" id={col2} onClick={updatePartials}><h1 className="text-center">{props.to_do_description}</h1></button></div>
            <div className="flex justify-center"><button className="w-full" id={col3} onClick={updatePartials}><h1 className="text-center">{props.to_do_completed.toString()}</h1></button></div>
            <div className="flex justify-center"><button className="w-full" id={col4} onClick={updatePartials}><h1 className="text-center">{props.to_do_order}</h1></button></div>
            <div className="w-11/12 mx-auto flex justify-center">
                <button id="detail" className="text-white font-medium text-center w-1/2 rounded-md mr-px bg-green-500">Detail</button>
                <button id="delete" className="text-white font-medium text-center w-1/2 rounded-md ml-px bg-red-500" onClick={deleteToDo}>Delete</button>
            </div>
        </div>
    );

};

export default ToDoItem;