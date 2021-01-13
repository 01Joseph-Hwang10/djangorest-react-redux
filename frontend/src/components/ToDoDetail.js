import React from 'react';
import axios from 'axios';
import ToDoItem from './ToDoItem';
import CSRFToken from '../csrftoken';
import json_cookie from  '../routes/auth/cookie';

class ToDoDetail extends React.Component {
    state = {
        isLoading: true,
        isSignedUp: false
    };
    getToDoItems = async () => {
        const sortByOrder = (a,b) => {
        if (a.to_do_order < b.to_do_order) {
            return -1;
        }
        if (a.to_do_order > b.to_do_order) {
            return 1;
        }
        return 0;
    };
    if (this.props.id) {
        const { data } = await axios.get(`/backend/todos-api/todo_container/${this.props.id}.json`);
        this.setState({ 
            toDoItems: data.get_todo_items.sort(sortByOrder), 
            isLoading: false, 
            headElements:{
                todos_name:data.todos_name,
                todos_important:data.todos_important,
                todos_id:data.id,
                created_by:Number(data.created_by)
            }});
        } else {
            const { data } = await axios.get(`/backend/todos-api/todo_container/${window.location.hash.replace(/\D/g,'')}.json`);
            this.setState({ 
                toDoItems: data.get_todo_items.sort(sortByOrder), 
                isLoading: false, 
                headElements:{
                    todos_name:data.todos_name,
                    todos_important:data.todos_important,
                    todos_id:data.id,
                    created_by:Number(data.created_by)
                }});
            }
        }
        componentDidMount() {
            this.getToDoItems();
        }
        render() {
            // const updateList = () => {
            //     this.getToDoItems();
            // };
            // eslint-disable-next-line
            const {isAuthenticated , setIsAuthenticated} = this.props;
            const { isLoading, toDoItems, headElements } = this.state;
            
            if (isAuthenticated && headElements && Number(json_cookie.user_id) === headElements.created_by) {
            let id;
            if (this.props.id){
                id=this.props.id;
            } else {
                id=window.location.hash.replace(/\D/g,'');
            }
                
            const checkResponse = (response) => {
                    while (!response) {
                        if (response) {
                            break;
                        }
                    }
                    this.getToDoItems();
                }
            const postToDo = async (e) => {
                e.preventDefault();
                const to_do_name = document.getElementsByName("to_do_name")[0],
                    to_do_description = document.getElementsByName("to_do_description")[0],
                    order = document.getElementsByName("to_do_order")[0],
                    csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                let post_data;
                if (to_do_name.value) {
                    const to_do_belongs=window.location.hash.replace(/\D/g,'');
                    let newOrder;
                    if (!order.value) {
                        newOrder=toDoItems.length+1;
                    } else {
                        newOrder=order.value;
                    }
    
                    post_data={
                        to_do_belongs:to_do_belongs,
                        to_do_name:to_do_name.value,
                        to_do_description:to_do_description.value,
                        to_do_order:newOrder
                        };
                    if(csrftoken.value) {
                        post_data.csrfmiddlewaretoken = csrftoken.value;
                    } else {
                        post_data.csrfmiddlewaretoken = false;
                    }
    
    
    
                    axios
                    .post("/backend/todos-api/todo/",post_data)
                    .then(response => checkResponse(response))
                    .catch(error => console.log(error));
    
                    to_do_name.value="";
                    to_do_description.value="";
                    order.value="";
    
                } else {
                    alert("To-Do is required!");
                }
            }
            
            const updatePartials = (e) => {
 
                const currentState = e.target.innerText;
                const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                const div = e.target.parentNode;
                const button = e.target;
                const buttonNumber = Number(button.id.slice(1));
                const patchToDo = async (form,data,button) => {
                    data.id=Number(id);
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
                        await axios
                        .patch(`/backend/todos-api/todo_container/${id}.json`,data)
                        .then(response => checkResponse(response))
                        .catch(error => console.log(error));
                        form.remove();
                        button.style.display = "block";
                    })
                }
                if (buttonNumber !== 6) {
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
                    input.placeholder= "To-Do Topic";
                    input.name="todos_name";
                    patchToDo(form,{data:"",type:"todos_name"},button)
                } else {
                    const patchBool = async (switchto) => {
                        const csrftoken = document.getElementsByName("csrfmiddlewaretoken")[0];
                        let post_data={
                            data:Boolean(switchto),
                            type:"todos_important",
                            id:id
                        };
                        if(csrftoken.value) {
                            post_data.csrfmiddlewaretoken = csrftoken.value;
                        } else {
                            post_data.csrfmiddlewaretoken = false;
                        }
                        await axios
                        .patch(`/backend/todos-api/todo_container/${id}.json`,post_data)
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
                        .delete(`/backend/todos-api/todo_container/${id}.json`)
                        .then(response => {
                            window.location.replace(`http://localhost:3000/#/pinboard/${json_cookie.user_id}`);
                        })
                        .catch(error => console.log(error));
            };

            const switchDisplay = () => {
                const menu = document.getElementById("toDoSettings")
                if (menu.style.display === "none") {
                    menu.style.display = "block";
                } else {
                    menu.style.display = "none";
                }
                document.addEventListener("click",(e)=>{
                    if (e.target.id !== "toDoSettingsBtn") {
                        menu.style.display="none";
                    }
                });
            }

            return (<section className="container mx-auto">
                {isLoading ? (
                    <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-3xl text-bold text-gray-600">Loading...</span>
                    </div>
                ) : (
                        <div className="w-11/12 mt-5 mx-auto border border-gray-300 rounded">
                            <div className="toDoDetailHeader w-full border-b-2 border-black p-3 grid grid-cols-3 items-center">
                                <div className="text-left relative">
                                <button id="toDoSettingsBtn" onClick={switchDisplay}>To-Do Menu</button>
                                    <div id="toDoSettings" className="absolute flex flex-col bg-gray-100 border border-gray-400" style={{display:'none'}}>
                                        <button onClick={deleteToDo} className="block p-3 border-b border-gray-400">Delete</button>
                                        <button className="block p-3">Private</button>
                                    </div>
                                </div>
                                <div><button onClick={updatePartials} id="h5" className="w-full text-center font-semibold text-2xl">{headElements.todos_name}</button></div>
                                <div><button onClick={updatePartials} id="h6" className="w-full text-right">{headElements.todos_important.toString()}</button></div>
                            </div>
                            <div className="toDoDetailBody w-full">
                            <div className="toDoDetailHeader w-full border-b-2 border-gray-400 p-3 grid grid-cols-5">
                                <h1 className="text-center">To-Do</h1>
                                <h1 className="text-center">Description</h1>
                                <h1 className="text-center">Completed?</h1>
                                <h1 className="text-center">Order</h1>
                                <h1 className="text-center">Manage</h1>
                            </div>
                                {
                                    toDoItems.map(toDoItem => {
                                        return (
                                            <ToDoItem
                                                key={toDoItem.id}
                                                id={toDoItem.id}
                                                to_do_name={toDoItem.to_do_name}
                                                to_do_description={toDoItem.to_do_description}
                                                to_do_completed={toDoItem.to_do_completed}
                                                to_do_order={toDoItem.to_do_order}
                                                getToDoItems={this.getToDoItems}
                                                isAuthenticated={true}
                                            />
                                        )
                                    })
                                }
                                <div>
                                    <form action="/backend/todos-api/todo/" onSubmit={postToDo} method="POST" className="createToDo grid grid-cols-5 p-3">
                                        <CSRFToken />
                                        <input required type="text" className="input1 text-center" placeholder="To-Do" name="to_do_name"></input>
                                        <input type="text" className="input1 text-center" placeholder="description" name="to_do_description"></input>
                                        <span className="text-center">false</span>
                                        <input type="number" className="input1 text-center" placeholder="Order" name="to_do_order"></input>
                                        <button className="font-bold text-center w-11/12 mx-auto bg-gray-400 rounded-lg text-white">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    )
                }
            </section>)
        } else {
                return (<section className="container mx-auto">
                {isLoading ? (
                    <div className="loader w-screen h-screen flex justify-center items-center bg-gray-100">
                        <span className="loader__text text-3xl text-bold text-gray-600">Loading...</span>
                    </div>
                ) : (
                        <div className="w-11/12 mt-5 mx-auto border border-gray-300 rounded">
                            <div className="toDoDetailHeader w-full border-b-2 border-black p-3 flex justify-center">
                                <div className="w-1/3 text-left"></div>
                                    <div className="w-1/3"><h1 className="text-center font-semibold text-2xl">{headElements.todos_name}</h1></div>
                                    <div className="w-1/3"><h1 className="text-right">{headElements.todos_important.toString()}</h1></div>
                                </div>
                            <div className="toDoDetailBody w-full">
                            <div className="toDoDetailHeader w-full border-b-2 border-gray-400 p-3 grid grid-cols-4">
                                <h1 className="text-center">To-Do</h1>
                                <h1 className="text-center">Description</h1>
                                <h1 className="text-center">Completed?</h1>
                                <h1 className="text-center">Order</h1>
                            </div>
                                {
                                    toDoItems.map(toDoItem => {
                                        return (
                                            <ToDoItem
                                                key={toDoItem.id}
                                                id={toDoItem.id}
                                                to_do_name={toDoItem.to_do_name}
                                                to_do_description={toDoItem.to_do_description}
                                                to_do_completed={toDoItem.to_do_completed}
                                                to_do_order={toDoItem.to_do_order}
                                                getToDoItems={this.getToDoItems}
                                                isAuthenticated={false}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>

                    )
                }
            </section>)
        }

    }
}

export default ToDoDetail;