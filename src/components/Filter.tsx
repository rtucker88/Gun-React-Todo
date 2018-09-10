import * as React from "react";
import { ButtonGroup, Button } from "@blueprintjs/core";

import "../assets/scss/Filter.scss";
import { TransProps } from "react-i18next/src/trans";
import { translate } from "react-i18next";

interface FilterProps {
    filterToggle: FilterToggle;
    onUpdateFilter: (toggle: FilterToggle) => void;
}

type FilterCombinedProps = FilterProps & TransProps;

export type FilterToggle = "ALL" | "COMPLETED" | "INCOMPLETE";

export const Filter: React.SFC<FilterCombinedProps> = ({ filterToggle, onUpdateFilter, t }) => {
    return (
    <div className="filter">
        <ButtonGroup>
            <Button active={filterToggle === "ALL"} onClick={() => onUpdateFilter("ALL")}>{t("all")}</Button>
            <Button active={filterToggle === "INCOMPLETE"} onClick={() => onUpdateFilter("INCOMPLETE")} icon="square">{t("incomplete")}</Button>
            <Button active={filterToggle === "COMPLETED"} onClick={() => onUpdateFilter("COMPLETED")} icon="tick">{t("completed")}</Button>
        </ButtonGroup>
    </div>);
};

Filter.displayName = "Filter";

export default translate("filterToggle")(Filter);