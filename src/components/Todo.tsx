import * as React from "react";
import * as classNames from "classnames";
import { Card, Button, Checkbox } from "@blueprintjs/core";
import { formatRelative } from "date-fns";
import { enUS, de } from "date-fns/esm/locale";

import "../assets/scss/Todo.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";
import { I18nLanguage } from "./LanguagePicker";
import UnreachableCaseError from "../utils/UnreachableErrorCase";

interface TodoProps {
    contents: string;
    completed: boolean;
    id: string;
    timeCreated: number;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
}

type CombinedTodoProps = TodoProps & TransProps;

export const Todo: React.SFC<CombinedTodoProps> = ({ completed, contents, i18n, id, onComplete, onDelete, t, timeCreated }) => {
    return (<Card className={classNames("todo", { completed })}>
            <Checkbox checked={completed} onChange={() => onComplete(id)} className="aligner"/>
            <p className="aligner">{contents}</p>
            <Button icon="trash" onClick={() => onDelete(id)} minimal={true} intent="danger" className="aligner" />
            <span className="created-date">{`${t("created")} ${formatRelative(timeCreated, Date.now(), { locale: getDateFnLocale((i18n as any).default.language) })}`}</span>
    </Card>);
};

Todo.displayName = "Todo";

export default translate("todo")(Todo);

function getDateFnLocale(language: I18nLanguage) {
    switch (language) {
        case "en":
            return enUS;
        case "de":
            return de;
        case "el":
            // Greek isn't supported in the newest version, update this later
            return enUS;
        default:
            throw new UnreachableCaseError(language);
    }
}