import * as React from "react";
import * as renderer from "react-test-renderer";
import { mount } from "enzyme";
import { default as AddTodo, stateHandlers, handlers, AddTodoCombinedProps } from "../src/components/AddTodo";

describe("AddTodo", () => {
   class MockComponent extends React.Component<AddTodoCombinedProps> {
        render() {
            return <div />;
        }
    }

    const onAddTodoMock = jest.fn();

    beforeEach(() => {
        onAddTodoMock.mockClear();
    });

    it("renders correctly", () => {
        const tree = renderer.create((<AddTodo onAddTodo={jest.fn()} />)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("handles state correctly", () => {
        it("handles an input change correctly", () => {
            const Enhanced = stateHandlers(MockComponent);
            const wrapper = mount(<Enhanced onAddTodo={onAddTodoMock} />);
            const subject = wrapper.find(MockComponent);
            subject.prop("onInputChange")({ target: { value: "VALUE" } });
            expect(wrapper.state("text")).toEqual("VALUE");
        });

        it("adds a new todo correctly", () => {
            const Enhanced = stateHandlers(MockComponent);
            const wrapper = mount(<Enhanced onAddTodo={onAddTodoMock} />);
            const subject = wrapper.find(MockComponent);

            wrapper.setState({ text: "NEW TODO" });
            subject.prop("onAddNewTodo")();
            expect(onAddTodoMock.mock.calls[0][0]).toEqual("NEW TODO");
            expect(wrapper.state("text")).toEqual("");
        });
    });

    describe("handles on key down", () => {
        it("handles the enter case", () => {
            const onAddNewTodoMock = jest.fn();
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced onAddTodo={onAddTodoMock} onAddNewTodo={onAddNewTodoMock} onInputChange={jest.fn()} />);
            const subject = wrapper.find(MockComponent);

            wrapper.setState({ text: "TEXT" });
            subject.prop("onKeyDown")({ keyCode: 13 } as React.KeyboardEvent<HTMLInputElement>);
            expect(onAddNewTodoMock.mock.calls.length).toEqual(1);
        });

        it("handles a non-enter case", () => {
            const onAddNewTodoMock = jest.fn();
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced onAddTodo={onAddTodoMock} onAddNewTodo={onAddNewTodoMock} onInputChange={jest.fn()} />);
            const subject = wrapper.find(MockComponent);

            wrapper.setState({ text: "TEXT" });
            subject.prop("onKeyDown")({ keyCode: 65 } as React.KeyboardEvent<HTMLInputElement>);
            expect(onAddNewTodoMock.mock.calls.length).toEqual(0);
        });
    });
});
