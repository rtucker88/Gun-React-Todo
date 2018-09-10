import * as React from "react";
import * as uuidv4 from "uuid/v4";
import * as i18nnext from "i18next";
import Navbar from "./Navbar";
import { TodoList, Todo } from "./TodoList";
import AddTodo from "./AddTodo";
import { default as Filter, FilterToggle } from "./Filter";
import UnreachableCaseError from "../utils/UnreachableErrorCase";
import NoTodosFound from "./NoTodosFound";

import "../assets/scss/App.scss";
import { I18nLanguage } from "./LanguagePicker";
import i18n from "../i18n";

export interface AppProps {
}

interface AppState {
    todos: Todo[];
    filterToggle: FilterToggle;
    currentLanguage: I18nLanguage;
}

export default class App extends React.Component<AppProps, AppState> {
    state = {
        todos: [],
        filterToggle: "ALL" as FilterToggle,
        currentLanguage: "en" as I18nLanguage,
    };

    componentWillMount() {
        // Trim this here because we'll get things like en-US and en-UK
        this.setState({
            currentLanguage: (i18nnext as any).default.language.substr(0, 2) as I18nLanguage,
        });
    }

    private static getFilteredTodos(todos: Todo[], toggle: FilterToggle): Todo[] {
        return todos.filter(todo => {
            switch (toggle) {
                case "ALL":
                    return true;
                case "COMPLETED":
                    return todo.completed;
                case "INCOMPLETE":
                    return !todo.completed;
                default:
                    throw new UnreachableCaseError(toggle);
            }
        });
    }

    private handleAddTodo = (text: string) => {
        this.setState((state: Readonly<AppState>) => {
            state.todos.push({ contents: text, completed: false, timeCreated: Date.now(), id: uuidv4() });
            return {
                todos: state.todos,
            };
        });
    }

    private handleTodoCompletion = (id: string) => {
        this.setState((state: Readonly<AppState>) => {
            const todo = state.todos.find(todo => todo.id === id);
            todo.completed = !todo.completed;

            return {
                todos: state.todos,
            };
        });
    }

    private handleTodoDelete = (id: string) => {
        this.setState((state: Readonly<AppState>) => {
            const todoIndex = state.todos.findIndex(todo => todo.id === id);
            state.todos.splice(todoIndex, 1);

            return {
                todos: state.todos,
            };
        });
    }

    private handleUpdateFilter = (filterToggle: FilterToggle) => {
        this.setState({
            filterToggle,
        });
    }

    private handleLanguageChange = (currentLanguage: I18nLanguage) => {
        i18n.changeLanguage(currentLanguage);

        this.setState({
            currentLanguage,
        });
    }

    render() {
        const { currentLanguage, filterToggle, todos } = this.state;

        const filteredTodos = App.getFilteredTodos(todos, filterToggle);

        return (
            <div className="app">
                <Navbar currentLanguage={currentLanguage} onChangeLanguage={this.handleLanguageChange}></Navbar>
                <h1 className="todo-header">Todos</h1>
                <AddTodo onAddTodo={this.handleAddTodo} />
                <Filter filterToggle={filterToggle} onUpdateFilter={this.handleUpdateFilter} />
                {filteredTodos.length ? <TodoList todos={filteredTodos} onComplete={this.handleTodoCompletion} onDelete={this.handleTodoDelete} /> : <NoTodosFound />}
            </div>
        );
    }
}
