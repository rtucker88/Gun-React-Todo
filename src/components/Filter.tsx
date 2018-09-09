import * as React from "react";
import { ButtonGroup, Button } from "@blueprintjs/core";

import "../assets/scss/Filter.scss";

interface FilterProps {
    filterToggle: FilterToggle;
    onUpdateFilter: (toggle: FilterToggle) => void;
}

export type FilterToggle = "ALL" | "COMPLETED" | "INCOMPLETE";

export const Filter: React.SFC<FilterProps> = ({ filterToggle, onUpdateFilter }) => {
    return (
    <div className="filter">
        <ButtonGroup>
            <Button active={filterToggle === "ALL"} onClick={() => onUpdateFilter("ALL")}>All</Button>
            <Button active={filterToggle === "INCOMPLETE"} onClick={() => onUpdateFilter("INCOMPLETE")} icon="square">Incomplete</Button>
            <Button active={filterToggle === "COMPLETED"} onClick={() => onUpdateFilter("COMPLETED")} icon="tick">Completed</Button>
        </ButtonGroup>
    </div>);
};

Filter.displayName = "Filter";

export default Filter;