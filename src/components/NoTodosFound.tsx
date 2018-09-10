import * as React from "react";
import { NonIdealState } from "@blueprintjs/core";

import "../assets/scss/NoTodosFound.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";

interface NoTodosFoundProps {}

type NoTodosFoundCombinedProps = NoTodosFoundProps & TransProps;

export const NoTodosFound: React.SFC<NoTodosFoundCombinedProps> = (props) => {
    const { t } = props;

    return (<div className="no-todos-found">
        <NonIdealState title={t("noneFoundTitle")} description={t("noneFoundDescription")} icon="zoom-out" />
    </div>);
};

NoTodosFound.displayName = "NoTodosFound";

export default translate("noTodosFound")(NoTodosFound);
