import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import { I18nextProvider } from "react-i18next";
import App from "./components/App";
import i18n from "./i18n";

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";

const rootEl = document.getElementById("root");

render(
    <AppContainer>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </AppContainer>,
    rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/App", () => {
        const NewApp = require("./components/App").default;

        render(
            <AppContainer>
                <NewApp/>
            </AppContainer>,
            rootEl
        );
    });
}
