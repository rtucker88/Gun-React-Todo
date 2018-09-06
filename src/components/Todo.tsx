import * as React from "react";
import * as classNames from "classnames";
import { Card, Button, Checkbox } from "@blueprintjs/core";

import "../assets/scss/Todo.scss";

interface TodoProps {
    contents: string;
    completed: boolean;
    onDelete: () => void;
    onComplete: () => void;
}

export const Todo: React.SFC<TodoProps> = ({ completed, contents, onComplete, onDelete }) => {
    return (<Card className={classNames("todo", { completed })}>
        <p>{contents}</p>
        <Button icon="trash" onClick={onDelete} minimal={true} />
        <Checkbox checked={completed} onChange={onComplete} />
    </Card>);
};
