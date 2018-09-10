import * as React from "react";
import { Button, Popover, MenuItem, Menu, Position } from "@blueprintjs/core";
import UnreachableCaseError from "../utils/UnreachableErrorCase";

interface LanguagePickerProps {
    onChangeLanguage: (language: I18nLanguage) => void;
    currentLanguage: I18nLanguage;
}

export type I18nLanguage = "en" | "de" | "el";

export const LanguagePicker: React.SFC<LanguagePickerProps> = ({ currentLanguage, onChangeLanguage }) => {
    return (
        <Popover content={getMenuItems(onChangeLanguage)} position={Position.BOTTOM_LEFT}>
            <Button icon="caret-down" text={getCurrentLocaleFlag(currentLanguage)} minimal={true}></Button>
        </Popover>
    );
};

LanguagePicker.displayName = "LanguagePicker";

export default LanguagePicker;

function getMenuItems(onClick: (language: I18nLanguage) => void) {
    return (<Menu>
        <MenuItem text={`${getFlagFromCountryCode("US")} English`} onClick={() => onClick("en")} />
        <MenuItem text={`${getFlagFromCountryCode("DE")} Deutsch`} onClick={() => onClick("de")} />
        <MenuItem text={`${getFlagFromCountryCode("GR")} ελληνικά`} onClick={() => onClick("el")} />
    </Menu>);
}

function getCurrentLocaleFlag(locale: I18nLanguage): string {
    switch (locale) {
        case "en":
            return getFlagFromCountryCode("US");
        case "de":
            return getFlagFromCountryCode("DE");
        case "el":
            return getFlagFromCountryCode("GR");
        default:
            throw new UnreachableCaseError(locale);
    }
}

function getFlagFromCountryCode(countryCode: string): string {
    // Taken from https://binarypassion.net/lets-turn-an-iso-country-code-into-a-unicode-emoji-shall-we-870c16e05aad
    return countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}