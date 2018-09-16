import * as React from "react";
import { mount } from "enzyme";
import NoTodosFound from "../src/components/NoTodosFound";

describe("Todo", () => {
    it("should render correctly", () => {
        const wrapper = mount(<NoTodosFound />);
                expect(wrapper).toMatchSnapshot();
    });
});
