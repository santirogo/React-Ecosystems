import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos
} from './selectors';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import './TodoList.css';

const TodoList = ({ completedTodos, incompletedTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])

    const loadingMessage = <div>Loading todos...</div>
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {
                incompletedTodos.map(todo => <TodoListItem 
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletePressed={onCompletePressed} />)
            }
            <h3>Completed:</h3>
            {
                completedTodos.map(todo => <TodoListItem 
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletePressed={onCompletePressed} />)
            }
        </div>
    );
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);