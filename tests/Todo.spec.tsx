import * as React from "react";
import { mount } from "enzyme";
import { I18nLanguage } from "../src/components/LanguagePicker";
import { enUS, de } from "date-fns/esm/locale";
import Todo, { getDateFnLocale, CombinedTodoProps, handlers } from "../src/components/Todo";

describe("Todo", () => {
    it("should render", () => {
        const wrapper = mount(<Todo
                contents="CONTENT"
                completed={true}
                id="MY ID"
                timeCreated={1000}
                onDelete={jest.fn()}
                onComplete={jest.fn()}
                />);
                expect(wrapper).toMatchSnapshot();
    });

    it("should get the date function locale", () => {
        const languages: I18nLanguage[] = ["en", "de", "el", "uk"];
        const locales = [enUS, de, enUS, enUS];

        languages.forEach((language, idx) => {
            const locale = getDateFnLocale(language);
            expect(locale).toEqual(locales[idx]);
        });

        const unknownLocale = getDateFnLocale("XYZ" as I18nLanguage);
        expect(unknownLocale).toEqual(enUS);
    });

    describe("tests handlers", () => {
        class MockComponent extends React.Component<CombinedTodoProps> {
            render() {
                return <div />;
            }
        }

        const onCompleteMock = jest.fn();
        const onDeleteMock = jest.fn();

        beforeEach(() => {
            onCompleteMock.mockClear();
            onDeleteMock.mockClear();
        });

        it("handles on complete", () => {
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced contents="CONTENT"
            completed={true}
            id="MY ID"
            timeCreated={1000}
            onDelete={onDeleteMock}
            onComplete={onCompleteMock} />);
            const subject = wrapper.find(MockComponent);

            subject.prop("handleComplete")();
            expect(onCompleteMock.mock.calls[0][0]).toEqual("MY ID");
        });

        it("handles on delete", () => {
            const Enhanced = handlers(MockComponent);
            const wrapper = mount(<Enhanced contents="CONTENT"
            completed={true}
            id="MY ID"
            timeCreated={1000}
            onDelete={onDeleteMock}
            onComplete={onCompleteMock} />);
            const subject = wrapper.find(MockComponent);

            subject.prop("handleDelete")();
            expect(onDeleteMock.mock.calls[0][0]).toEqual("MY ID");
        });
    });
});
