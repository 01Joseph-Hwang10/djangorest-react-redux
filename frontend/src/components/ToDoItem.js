import axios from 'axios';
import React from 'react';
import CSRFToken from '../csrftoken';
import json_cookie from '../routes/auth/cookie';
// import csrftoken from '../csrftoken';

function ToDoItem(props) {

    const col1 = ["c1","r",props.to_do_order].join('');
    const col2 = ["c2","r",props.to_do_order].join('');
    const col3 = ["c3","r",props.to_do_order].join('');
    const col4 = ["c4","r",props.to_do_order].join('');

    if (props.isAuthenticated){
        
        const checkResponse = (response) => {
            while (!response) {
                if (response) {
                    break;
                }
            }
            props.getToDoItems();
        }   
    
        const updatePartials = (e) => {
            const currentState = e.target.innerText;
            const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
            let div;
            let button;
            if (currentState){
                div = e.target.parentNode.parentNode;
                button = e.target.parentNode;
            } else {
                div = e.target.parentNode;
                button = e.target;
            }
            const buttonNumber = Number(button.id.slice(1,2));
            console.log(buttonNumber);
            const patchToDo = async (form,data,button) => {
                data.id=Number(props.id);
                if(csrftoken.value) {
                    data.csrfmiddlewaretoken = csrftoken.value;
                } else {
                    data.csrfmiddlewaretoken = false;
                }
                const input = div.childNodes[1][0];
                input.focus();
                input.style.backgroundColor = "#fef3c7";
                input.onblur = function(){this.style.backgroundColor="#f3f4f6";};
                input.onfocus = function(){this.style.backgroundColor="#fef3c7";};
                form.addEventListener("submit",async function(){
                    data.data = input.value;
                    // const config = {
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //         'X-CSRFToken': csrftoken
                    //       }
                    // }
                    const config = {
                        headers: {
                            Authorization: `Token ${json_cookie.access_token}`
                        }
                    }
                    await axios
                    .patch(`/backend/todos-api/todo/${props.id}.json`,data,config)
                    .then(response => checkResponse(response))
                    .catch(error => console.log(error));
                    form.remove();
                    button.style.display = "block";
                })
            }
            if (buttonNumber !== 3) {
                button.style.display = "none";
                const input = document.createElement("input");
                if (input.value) {input.value = currentState;};
                input.style.width = "100%";
                input.style.textAlign = "center";
                input.value = currentState;
                const form = document.createElement("form");
                form.style.width = "100%";
                form.appendChild(input);
                div.appendChild(form);
                switch (buttonNumber) {
                    case 1:
                        input.placeholder= "To-Do";
                        input.name="to_do_name";
                        patchToDo(form,{data:"",type:"to_do_name"},button)
                        return;
                    case 2:
                        input.placeholder= "Description";
                        input.name="to_do_description";
                        patchToDo(form,{data:"",type:"to_do_description"},button)
                        return;
                    case 4:
                        input.placeholder= "Order";
                        input.name="to_do_order";
                        patchToDo(form,{data:"",type:"to_do_order"},button)
                        return;
                    default:
                        console.log("Something went wrong");
                }
            } else if (buttonNumber===3) {
                console.log(div,button)
                const patchBool = async (switchto) => {
                    const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                    let post_data={
                        data:Boolean(switchto),
                        type:"to_do_completed",
                        id:props.id
                    };
                    if(csrftoken.value) {
                        post_data.csrfmiddlewaretoken = csrftoken.value;
                    } else {
                        post_data.csrfmiddlewaretoken = false;
                    }
                    const config = {
                        headers: {
                            Authorization: `Token ${json_cookie.access_token}`
                        }
                    }
                    await axios
                    .patch(`/backend/todos-api/todo/${props.id}.json`,post_data,config)
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
            const config = {
                headers: {
                    Authorization: `Token ${json_cookie.access_token}`
                }
            }
            await axios
                    .delete(`/backend/todos-api/todo/${props.id}.json`,config)
                    .then(response => checkResponse(response))
                    .catch(error => console.log(error));
        };
    
        return (
            <div className="toDoItem border-b-2 border-gray-300 p-3 grid grid-cols-5">
                <CSRFToken />
                <div className="flex justify-center"><button className="w-full" id={col1} onClick={updatePartials}><h1 className="text-center">{props.to_do_name}</h1></button></div>
                <div className="flex justify-center"><button className="w-full" id={col2} onClick={updatePartials}><h1 className="text-center">{props.to_do_description}</h1></button></div>
                <div className="flex justify-center"><button className="w-full" id={col3} onClick={updatePartials}><h1 className="text-center">{props.to_do_completed.toString()}</h1></button></div>
                <div className="flex justify-center"><button className="w-full" id={col4} onClick={updatePartials}><h1 className="text-center">{props.to_do_order}</h1></button></div>
                <div className="w-11/12 mx-auto flex flex-col sm:flex-row justify-center">
                    <button id="detail" className="text-white font-medium text-center w-full sm:w-1/2 rounded-md mb-px sm:mr-px bg-green-500">Detail</button>
                    <button id="delete" className="text-white font-medium text-center w-full sm:w-1/2 rounded-md sm:ml-px bg-red-500" onClick={deleteToDo}>Delete</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="toDoItem border-b-2 border-gray-300 p-3 grid grid-cols-4">
                <div className="flex justify-center"><span className="w-full" id={col1}><h1 className="text-center">{props.to_do_name}</h1></span></div>
                <div className="flex justify-center"><span className="w-full" id={col2}><h1 className="text-center">{props.to_do_description}</h1></span></div>
                <div className="flex justify-center"><span className="w-full" id={col3}><h1 className="text-center">{props.to_do_completed.toString()}</h1></span></div>
                <div className="flex justify-center"><span className="w-full" id={col4}><h1 className="text-center">{props.to_do_order}</h1></span></div>
            </div>
        );
    }
    

};

export default ToDoItem;