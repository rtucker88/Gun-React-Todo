import * as React from "react";
import { mount } from "enzyme";
import TodoList from "../src/components/TodoList";

describe("TodoList", () => {
    const onDeleteMock = jest.fn();
    const onCompleteMock = jest.fn();

    beforeEach(() => {
        onDeleteMock.mockReset();
        onCompleteMock.mockReset();
    });

    const todos = [{
        contents: "FIRST",
        completed: false,
        timeCreated: 1000,
        id: "ID"
    }];

    it("should render", () => {
        const wrapper = mount(<TodoList
            todos={todos}
            onComplete={onCompleteMock}
            onDelete={onDeleteMock}
                />);
                expect(wrapper).toMatchSnapshot();
    });
});