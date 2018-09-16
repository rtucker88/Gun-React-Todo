import * as React from "react";
import { Button, Popover, MenuItem, Menu, Position } from "@blueprintjs/core";
import UnreachableCaseError from "../utils/UnreachableErrorCase";
import { setDisplayName, pure, compose } from "recompose";

interface LanguagePickerProps {
    onChangeLanguage: (language: I18nLanguage) => void;
    currentLanguage: I18nLanguage;
}

export type I18nLanguage = "en" | "de" | "el" | "uk";

interface MenuItemConfig {
    country: string;
    languageName: string;
    onClickParameter: I18nLanguage;
}

const menuItems: MenuItemConfig[] = [{
    country: "US",
    languageName: "English",
    onClickParameter: "en"
},
{
    country: "DE",
    languageName: "Deutsch",
    onClickParameter: "de"
},
{
    country: "GR",
    languageName: "ελληνικά",
    onClickParameter: "el"
},
{
    country: "UA",
    languageName: "Українська",
    onClickParameter: "uk"
}];

const LanguagePicker: React.StatelessComponent<LanguagePickerProps> = ({ currentLanguage, onChangeLanguage }) => {
    return (
        <Popover content={getMenuItems(onChangeLanguage)} position={Position.BOTTOM_LEFT}>
            <Button icon="caret-down" text={getCurrentLocaleFlag(currentLanguage)} minimal={true}></Button>
        </Popover>
    );
};

const enhance = compose<{}, LanguagePickerProps>(setDisplayName("LanguagePicker"), pure);
export default enhance(LanguagePicker);

export function getMenuItems(onClick: (language: I18nLanguage) => void) {
    return (<Menu>
        {menuItems.map(({ country, languageName, onClickParameter }) => {
            return (<MenuItem key={country} text={`${getFlagFromCountryCode(country)} ${languageName}`} onClick={() => onClick(onClickParameter)} />);
        })}
    </Menu>);
}


export function getCurrentLocaleFlag(locale: I18nLanguage): string {
    switch (locale) {
        case "en":
            return getFlagFromCountryCode("US");
        case "de":
            return getFlagFromCountryCode("DE");
        case "el":
            return getFlagFromCountryCode("GR");
        case "uk":
            return getFlagFromCountryCode("UA");
        default:
            throw new UnreachableCaseError(locale);
    }
}

export function getFlagFromCountryCode(countryCode: string): string {
    // Taken from https://binarypassion.net/lets-turn-an-iso-country-code-into-a-unicode-emoji-shall-we-870c16e05aad
    return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}