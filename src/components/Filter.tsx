import * as React from "react";
import { ButtonGroup, Button } from "@blueprintjs/core";

import "../assets/scss/Filter.scss";
import { TransProps } from "react-i18next/src/trans";
import { translate } from "react-i18next";
import { compose, setDisplayName, withHandlers } from "recompose";

interface FilterProps {
    filterToggle: FilterToggle;
    onUpdateFilter: (toggle: FilterToggle) => void;
}

interface FilterHandlerProps {
    updateAll: () => void;
    updateIncomplete: () => void;
    updateCompleted: () => void;
}

export type FilterCombinedProps = FilterProps & TransProps & FilterHandlerProps;

export const handlers = withHandlers<FilterProps, FilterHandlerProps>({
    updateAll: props => () => props.onUpdateFilter("ALL"),
    updateIncomplete: props => () => props.onUpdateFilter("INCOMPLETE"),
    updateCompleted: props => () => props.onUpdateFilter("COMPLETED"),
});

const enhance = compose<{}, FilterProps>(setDisplayName("Filter"), translate("filterToggle"), handlers);

export type FilterToggle = "ALL" | "COMPLETED" | "INCOMPLETE";

const Filter: React.SFC<FilterCombinedProps> = ({ filterToggle, updateAll, updateCompleted, updateIncomplete, t }) => {
    return (
    <div className="filter">
        <ButtonGroup>
            <Button active={filterToggle === "ALL"} onClick={updateAll}>{t("all")}</Button>
            <Button active={filterToggle === "INCOMPLETE"} onClick={updateIncomplete} icon="square">{t("incomplete")}</Button>
            <Button active={filterToggle === "COMPLETED"} onClick={updateCompleted} icon="tick">{t("completed")}</Button>
        </ButtonGroup>
    </div>);
};

export default enhance(Filter);