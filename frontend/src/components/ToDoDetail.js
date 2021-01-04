import React from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard';

class ToDoDetail extends React.Component {
    state = {
        isLoading: true,
        toDos: []
    };
    getToDos = async () => {
        const { data } = await axios.get("/backend/todos-api/todo_container.json");
        this.setState({ toDos: data.results, isLoading: false });
    }
    componentDidMount() {
        this.getToDos();
    }
    render() {
        const { isLoading, toDos } = this.state;
        return (<section className="container mx-auto">
            {isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>
            ) : (
                    <div className="toDos w-full">
                        {
                            toDos.map(toDo => {
                                return (
                                    <Link
                                        to={{
                                            pathname: `/${toDo.id}`,
                                            state: {
                                                id: toDo.id
                                            }
                                        }}>
                                        <ToDoCard
                                            key={toDo.id}
                                            id={toDo.id}
                                            todos_name={toDo.todos_name}
                                            todos_important={toDo.todos_important}
                                        />
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
            }
        </section>)
    }
}

export default ToDoDetail;