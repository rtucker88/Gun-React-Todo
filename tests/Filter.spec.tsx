import * as React from "react";
import { mount } from "enzyme";
import { default as Filter, FilterCombinedProps, handlers } from "../src/components/Filter";

describe("Filter", () => {
   class MockComponent extends React.Component<FilterCombinedProps> {
        render() {
            return <div />;
        }
    }

    const onUpdateFilterMock = jest.fn();

    beforeEach(() => {
        onUpdateFilterMock.mockClear();
    });

    it("renders correctly", () => {
        const wrapper = mount((<Filter
            filterToggle="ALL"
            onUpdateFilter={onUpdateFilterMock} />));
        expect(wrapper).toMatchSnapshot();
    });

    describe("handlers", () => {
        it("updates all", () => {
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced onUpdateFilter={onUpdateFilterMock} filterToggle="ALL" />);
            const subject = wrapper.find(MockComponent);
            subject.prop("updateAll")();
            expect(onUpdateFilterMock.mock.calls[0][0]).toEqual("ALL");
        });

        it("updates incomplete", () => {
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced onUpdateFilter={onUpdateFilterMock} filterToggle="ALL" />);
            const subject = wrapper.find(MockComponent);
            subject.prop("updateIncomplete")();
            expect(onUpdateFilterMock.mock.calls[0][0]).toEqual("INCOMPLETE");
        });

        it("updates complete", () => {
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced onUpdateFilter={onUpdateFilterMock} filterToggle="ALL" />);
            const subject = wrapper.find(MockComponent);
            subject.prop("updateCompleted")();
            expect(onUpdateFilterMock.mock.calls[0][0]).toEqual("COMPLETED");
        });
    });
});
