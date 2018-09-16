import * as React from "react";
import { NonIdealState } from "@blueprintjs/core";

import "../assets/scss/NoTodosFound.scss";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";
import { setDisplayName, compose, pure } from "recompose";

interface NoTodosFoundProps {}

type NoTodosFoundCombinedProps = NoTodosFoundProps & TransProps;

const NoTodosFound: React.SFC<NoTodosFoundCombinedProps> = ({ t }) => {
    return (<div className="no-todos-found">
        <NonIdealState title={t("noneFoundTitle")} description={t("noneFoundDescription")} icon="zoom-out" />
    </div>);
};

const enhance = compose(setDisplayName("NoTodosFound"), pure, translate("noTodosFound"));

export default enhance(NoTodosFound);
