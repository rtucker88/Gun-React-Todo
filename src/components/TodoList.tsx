import * as React from "react";
import TodoItem from "./Todo";

import "../assets/scss/TodoList.scss";
import { compose, setDisplayName, pure } from "recompose";

export interface Todo {
    contents: string;
    completed: boolean;
    timeCreated: number;
    id: string;
}

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
}

const TodoList: React.SFC<TodoListProps> = ({ onComplete, onDelete, todos }) => {
    return (<div className="todo-list">
        {todos.map(({ completed, contents, id, timeCreated }) => <TodoItem completed={completed} contents={contents} key={`${timeCreated}-${contents}`} onDelete={onDelete} onComplete={onComplete} id={id} timeCreated={timeCreated} />)}
    </div>);
};

const enhance = compose<{}, TodoListProps>(setDisplayName("TodoList"), pure);

export default enhance(TodoList);
