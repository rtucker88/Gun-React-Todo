import * as React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import { compose, withHandlers, withState } from "recompose";

import "../assets/scss/AddTodo.scss";

interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

interface AddTodoStateProps {
    text: string;
    onTextChange: (text: string) => string;
}

interface AddTodoHandlers {
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onAddNewTodo: (text: string) => void;
}

const enhance = compose<AddTodoCombinedProps, AddTodoProps>(
    withState("text", "onTextChange", ""),
    withHandlers({
        onAddNewTodo: (props: AddTodoCombinedProps) => (text: string) => {
            props.onAddTodo(text);
            props.onTextChange("");
        },
    }),
    withHandlers({
        onKeyDown: (props: AddTodoCombinedProps) => (event: React.KeyboardEvent<HTMLInputElement>) => event.keyCode === 13 ? props.onAddNewTodo(props.text) : null,
        onInputChange: (props: AddTodoCombinedProps) => (event: React.FormEvent<HTMLInputElement>) => props.onTextChange(event.currentTarget.value),
    }),
);

type AddTodoCombinedProps = AddTodoProps & AddTodoStateProps & AddTodoHandlers;

const AddTodo: React.SFC<AddTodoCombinedProps> = ({ onAddNewTodo, onKeyDown, onInputChange, text }) => {
    return (
        <div className="add-todo-container">
            <div className="add-todo">
                    <InputGroup onKeyDown={onKeyDown} onChange={onInputChange} value={text} className="add-todo-input" placeholder="Enter a new todo"/>
                    <Button onClick={() => onAddNewTodo(text)} icon="add" minimal={true} />
                </div>
        </div>);
};

AddTodo.displayName = "AddTodo";

export default enhance(AddTodo);
