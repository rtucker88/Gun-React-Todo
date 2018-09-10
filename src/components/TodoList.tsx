import * as React from "react";
import { default as TodoItem } from "./Todo";

import "../assets/scss/TodoList.scss";

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

export const TodoList: React.SFC<TodoListProps> = ({ onComplete, onDelete, todos }) => {
    return (<div className="todo-list">
        {todos.map(({ completed, contents, id, timeCreated }) => <TodoItem completed={completed} contents={contents} key={`${timeCreated}-${contents}`} onDelete={onDelete} onComplete={onComplete} id={id} timeCreated={timeCreated} />)}
    </div>);
};

TodoList.displayName = "TodoList";

export default TodoList;
