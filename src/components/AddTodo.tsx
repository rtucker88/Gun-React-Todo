import * as React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import { compose, withHandlers, withStateHandlers, setDisplayName, StateHandlerMap, StateHandler } from "recompose";

import "../assets/scss/AddTodo.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";

export interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

export interface AddTodoState {
    text: string;
}

export interface AddTodoStateHandlers extends StateHandlerMap<AddTodoState> {
    onInputChange: StateHandler<AddTodoState>;
    onAddNewTodo: StateHandler<AddTodoState>;
}

interface AddTodoHandlers {
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const stateHandlers = withStateHandlers<AddTodoState, AddTodoStateHandlers, AddTodoProps>({ text: "" }, {
    onInputChange: () => (event: React.ChangeEvent<HTMLInputElement>) => {
        return {
            text: event.target.value,
        };
    },
    onAddNewTodo: (state, props) => () => {
        props.onAddTodo(state.text);

        return {
            text: "",
        };
    },
});

export const handlers = withHandlers<AddTodoProps & AddTodoStateHandlers, AddTodoHandlers>({
    onKeyDown: (props: AddTodoCombinedProps) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            props.onAddNewTodo();
        }
    }
});

const enhance = compose<AddTodoCombinedProps, AddTodoProps>(setDisplayName("AddTodo"), translate("addTodos"), stateHandlers, handlers);

export type AddTodoCombinedProps = AddTodoState & AddTodoStateHandlers & AddTodoHandlers & TransProps & AddTodoProps;

export const AddTodo: React.StatelessComponent<AddTodoCombinedProps> = ({ onAddNewTodo, onKeyDown, onInputChange, t, text }) => {
    return (
        <div className="add-todo-container">
            <div className="add-todo">
                <InputGroup onKeyDown={onKeyDown} onChange={onInputChange} value={text} className="add-todo-input" placeholder={t("enterANewTodo")}/>
                <Button onClick={onAddNewTodo} icon="add" minimal={true} />
            </div>
        </div>);
};

export default enhance(AddTodo);
