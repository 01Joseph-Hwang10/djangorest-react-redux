import {createStore} from 'redux';

const ADD = "ADD";
const DELETE = "DELETE";
const UPDATE = "UPDATE";

const addToDo = (text) => {
    return {
        type:ADD,
        text
    };
};

const deleteToDo = (id) => {
    return {
        type:DELETE,
        id:parseInt(id)
    }
}

const updateToDo = () => {
    return {
        type:UPDATE
    }
};

const reducer = (state = [],action) => {
    switch (action.type) {
        case ADD:
            const newToDoObj = {text:action.text,id:Date.now()};
            return [newToDoObj,...state];
        case DELETE:
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        case UPDATE:
            return;
        default:
            return state;
    }
};

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo,
    updateTodo
}

export default store;