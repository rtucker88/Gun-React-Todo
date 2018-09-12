import * as React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import { compose, withHandlers, withStateHandlers, setDisplayName, StateHandlerMap } from "recompose";

import "../assets/scss/AddTodo.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";

interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

interface AddTodoStateProps {
    text: string;
}

interface AddTodoStateHandlers {
    onTextChange: (text: string) => { text: string };
    onAddNewTodo: () => { text: string };
}

interface AddTodoHandlers {
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const enhance = compose<AddTodoProps, AddTodoCombinedProps>(
    withStateHandlers<AddTodoStateProps, Partial<AddTodoStateHandlers>, AddTodoProps>({ text: "" }, {
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
    withHandlers<AddTodoProps, AddTodoHandlers>({
        onKeyDown: (props: AddTodoCombinedProps) => (event: React.KeyboardEvent<HTMLInputElement>) => event.keyCode === 13 ? props.onAddNewTodo() : null,
        onInputChange: (props: AddTodoCombinedProps) => (event: React.FormEvent<HTMLInputElement>) => props.onTextChange(event.currentTarget.value),
    }),
    setDisplayName("AddTodo"),
);

type AddTodoCombinedProps = AddTodoProps & AddTodoStateProps & AddTodoStateHandlers & AddTodoHandlers & TransProps;

const AddTodo: React.SFC<AddTodoCombinedProps> = ({ onAddNewTodo, onKeyDown, onInputChange, t, text }) => {
    return (
        <div className="add-todo-container">
            <div className="add-todo">
                <InputGroup onKeyDown={onKeyDown} onChange={onInputChange} value={text} className="add-todo-input" placeholder={t("enterANewTodo")}/>
                <Button onClick={onAddNewTodo} icon="add" minimal={true} />
            </div>
        </div>);
};

export const EnhancedTodo = enhance(AddTodo);

export default translate("addTodos")(enhance(AddTodo));
