import * as React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import { compose, withHandlers, withState, withStateHandlers, setDisplayName } from "recompose";

import "../assets/scss/AddTodo.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";

interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

interface AddTodoStateProps {
    text: string;
    onTextChange: (text: string) => { text: string };
    onAddNewTodo: () => { text: string };
}

interface AddTodoHandlers {
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onAddNewTodo: (text: string) => void;
}

const enhance = compose<AddTodoCombinedProps, AddTodoProps>(
    withState("text", "onTextChange", ""),
    withStateHandlers({ text: "" }, {
        onTextChange: () => (text: string) => {
            return {
                text,
            };
        },
        onAddNewTodo: (state: AddTodoStateProps, props: AddTodoCombinedProps) => () => {
            props.onAddTodo(state.text);

            return {
                text: "",
            };
        },
    }),
    withHandlers({
        onKeyDown: (props: AddTodoCombinedProps) => (event: React.KeyboardEvent<HTMLInputElement>) => event.keyCode === 13 ? props.onAddNewTodo(props.text) : null,
        onInputChange: (props: AddTodoCombinedProps) => (event: React.FormEvent<HTMLInputElement>) => props.onTextChange(event.currentTarget.value),
    }),
    setDisplayName("AddTodo"),
);

type AddTodoCombinedProps = AddTodoProps & AddTodoStateProps & AddTodoHandlers & TransProps;

const AddTodo: React.SFC<AddTodoCombinedProps> = ({ onAddNewTodo, onKeyDown, onInputChange, t, text }) => {
    return (
        <div className="add-todo-container">
            <div className="add-todo">
                <InputGroup onKeyDown={onKeyDown} onChange={onInputChange} value={text} className="add-todo-input" placeholder={t("enterANewTodo")}/>
                <Button onClick={onAddNewTodo} icon="add" minimal={true} />
            </div>
        </div>);
};

export default translate("addTodos")(enhance(AddTodo));
