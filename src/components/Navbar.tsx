import * as React from "react";
import { Navbar as BlueprintNavbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, Classes, Alignment } from "@blueprintjs/core";
import { LanguagePicker, I18nLanguage } from "./LanguagePicker";
import { translate } from "react-i18next";
import { TransProps } from "react-i18next/src/trans";

interface NavbarProps {
    onChangeLanguage: (language: I18nLanguage) => void;
    currentLanguage: I18nLanguage;
}

type CombinedNavbarProps = NavbarProps & TransProps;

const Navbar: React.SFC<CombinedNavbarProps> = ({ onChangeLanguage, currentLanguage, t }) => {
    return (<BlueprintNavbar>
            <NavbarGroup>
                <NavbarHeading>Gun-React-Todo</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text={t("home")} />
                <Button className={Classes.MINIMAL} icon="help" text={t("about")} />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <LanguagePicker onChangeLanguage={onChangeLanguage} currentLanguage={currentLanguage} />
            </NavbarGroup>
        </BlueprintNavbar>);
};

Navbar.displayName = "Navbar";

export default translate("navbar")(Navbar);