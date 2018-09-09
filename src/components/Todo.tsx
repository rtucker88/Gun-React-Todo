import * as React from "react";
import * as classNames from "classnames";
import { Card, Button, Checkbox } from "@blueprintjs/core";
import { formatRelative } from "date-fns";

import "../assets/scss/Todo.scss";

interface TodoProps {
    contents: string;
    completed: boolean;
    id: string;
    timeCreated: number;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
}

export const Todo: React.SFC<TodoProps> = ({ completed, contents, id, onComplete, onDelete, timeCreated }) => {
    return (<Card className={classNames("todo", { completed })}>
        <Checkbox checked={completed} onChange={() => onComplete(id)} className="aligner"/>
        <p className="aligner">{contents}</p>
        <Button icon="trash" onClick={() => onDelete(id)} minimal={true} intent="danger" className="aligner" />
        <span className="created-date">{getDateString(timeCreated)}</span>
    </Card>);
};

Todo.displayName = "Todo";

export default Todo;

function getDateString(timeCreated: number): string {
    return `Created ${formatRelative(timeCreated, new Date())}.`;
}
