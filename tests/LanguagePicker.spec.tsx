import * as React from "react";
import { mount } from "enzyme";
import { I18nLanguage, default as LanguagePicker, getFlagFromCountryCode, getCurrentLocaleFlag, getMenuItems } from "../src/components/LanguagePicker";
import { MenuItem } from "@blueprintjs/core";

describe("LanguagePicker", () => {
    it("renders correctly", () => {
        const languages: I18nLanguage[] = ["en", "de", "el", "uk"];

        languages.forEach(language => {
            const wrapper = mount(<LanguagePicker currentLanguage={language} onChangeLanguage={jest.fn()} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    it("gets the correct flag from the country code", () => {
        const brazil = "BR";
        const flag = getFlagFromCountryCode(brazil);

        expect(flag).toEqual("🇧🇷");
    });

    it("gets the current locale flag", () => {
        const languages: I18nLanguage[] = ["en", "de", "el", "uk"];
        const flags = ["🇺🇸", "🇩🇪", "🇬🇷", "🇺🇦"];

        languages.forEach((language, idx) => {
            const flag = getCurrentLocaleFlag(language);
            expect(flag).toEqual(flags[idx]);
        });

        expect(() => {
            getCurrentLocaleFlag("XYZ" as I18nLanguage);
        }).toThrow();
    });

    it("gets the menu items", () => {
        const menuItems = getMenuItems(jest.fn());
        const wrapper = mount(menuItems);
        expect(wrapper).toMatchSnapshot();
    });

    it("handles a click on a menu item", () => {
        const mockClickHandler = jest.fn();
        const menuItems = getMenuItems(mockClickHandler);

        const wrapper = mount(menuItems);
        const englishMenuItem = wrapper.find(MenuItem).at(0);
        englishMenuItem.prop("onClick")({} as React.MouseEvent<HTMLAnchorElement>);
        expect(mockClickHandler.mock.calls[0][0]).toEqual("en");
    });
});
