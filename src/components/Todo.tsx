import * as React from "react";
import * as classNames from "classnames";
import { withHandlers } from "recompose";
import { Card, Button, Checkbox } from "@blueprintjs/core";
import { formatRelative } from "date-fns";
import { enUS, de } from "date-fns/esm/locale";

import "../assets/scss/Todo.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";
import { I18nLanguage } from "./LanguagePicker";

interface TodoProps {
    contents: string;
    completed: boolean;
    id: string;
    timeCreated: number;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
}

interface TodoHandlerProps {
    handleComplete: () => void;
    handleDelete: () => void;
}

const enhance = withHandlers<TodoProps, TodoHandlerProps>({
    handleComplete: props => () => props.onComplete(props.id),
    handleDelete: props => () => props.onDelete(props.id),
});

type CombinedTodoProps = TodoProps & TodoHandlerProps & TransProps;

export const Todo: React.SFC<CombinedTodoProps> = ({ completed, contents, i18n, handleComplete, handleDelete, t, timeCreated }) => {
    return (<Card className={classNames("todo", { completed })}>
            <Checkbox checked={completed} onChange={handleComplete} className="aligner"/>
            <p className="aligner">{contents}</p>
            <Button icon="trash" onClick={handleDelete} minimal={true} intent="danger" className="aligner" />
            <span className="created-date">{`${t("created")} ${formatRelative(timeCreated, Date.now(), { locale: getDateFnLocale(i18n.language as I18nLanguage) })}`}</span>
    </Card>);
};

Todo.displayName = "Todo";

export default translate("todo")(enhance(Todo));

function getDateFnLocale(language: I18nLanguage) {
    switch (language) {
        case "en":
            return enUS;
        case "de":
            return de;
        case "el":
        case "uk":
            // Greek and Ukranian aren't supported in the newest version, update this later
            return enUS;
        default:
            return enUS;
    }
}