import * as React from "react";
import Navbar from "./Navbar";
import { Todo } from "./TodoList";
import { TodoList } from "./TodoList";

const reactLogo = require("./../assets/img/react_logo.svg");

export interface AppProps {
}

const todos: Todo[] = [
    { contents: "This is my first todo", completed: false },
    { contents: "This is my second todo", completed: true },
];

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div className="app">
                <Navbar></Navbar>
                <h1>Todos</h1>
                <TodoList todos={todos} />
            </div>
        );
    }
}
