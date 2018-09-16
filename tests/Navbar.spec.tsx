import * as React from "react";
import { mount } from "enzyme";
import Navbar from "../src/components/Navbar";

describe("Navbar", () => {
    const onChangeLanguageMock = jest.fn();

    beforeEach(() => {
        onChangeLanguageMock.mockReset();
    });

    it("should render correctly", () => {
        const wrapper = mount(<Navbar onChangeLanguage={onChangeLanguageMock} currentLanguage="en" />);
                expect(wrapper).toMatchSnapshot();
    });
});
