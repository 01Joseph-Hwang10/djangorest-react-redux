import React from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard';

class ToDoLists extends React.Component {
    state = {
        isLoading: true,
        toDos: []
    };
    getToDos = async () => {
        const { results } = await axios.get("/backend/todos-api/todo_container/?format=json");
        console.log(results) //Errors here
        this.setState({ toDos: results, isLoading: false })
    }
    componentDidMount() {
        this.getToDos();
    }
    render() {
        const { isLoading, toDos } = this.state;
        return (<section className="container">
            {isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>
            ) : (
                    <div className="toDos">
                        {
                            toDos.map(toDo => {
                                return <ToDoCard
                                    key={toDo.id}
                                    id={toDo.id}
                                    todos_name={toDo.todos_name}
                                    todos_important={toDo.todos_important}
                                />
                            })
                        }
                    </div>
                )
            }
        </section>)
    }
}

export default ToDoLists;