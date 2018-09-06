import * as React from "react";
import { Todo as TodoItem } from "./Todo";

import "../assets/scss/TodoList.scss";

export interface Todo {
    contents: string;
    completed: boolean;
    timeCreated?: Date; // TODO: Add this later
}

interface TodoListProps {
    todos: Todo[];
}

export const TodoList: React.SFC<TodoListProps> = ({ todos }) => {
    // TODO: Fix the key to be better
    return (<div className="todo-list">
        {todos.map(({ completed, contents }) => <TodoItem completed={completed} contents={contents} key={contents} onDelete={() => {}} onComplete={() => {}} />)}
    </div>);
};
