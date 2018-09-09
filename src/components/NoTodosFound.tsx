import * as React from "react";
import { NonIdealState } from "@blueprintjs/core";

import "../assets/scss/NoTodosFound.scss";

export const NoTodosFound: React.SFC<{}> = () => {
    return (<div className="no-todos-found">
        <NonIdealState title="No Todos Found" description="No todos were found. Try changing your toggle settings above or adding a new todo." icon="zoom-out" />
    </div>);
};

NoTodosFound.displayName = "NoTodosFound";

export default NoTodosFound;
