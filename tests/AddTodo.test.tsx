import * as React from "react";
import * as renderer from "react-test-renderer";
import { EnhancedTodo } from "../src/components/AddTodo";

it("renders correctly", () => {
const textState = { text: "text" };

    const tree = renderer
        .create(<EnhancedTodo
            onAddNewTodo={() => textState}
            onAddTodo={(text: string) => {}}
            onTextChange={(text: string) => textState}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {}}
            onInputChange={(event: React.KeyboardEvent<HTMLInputElement>) => {}}
            text=""
            t={(text: string) => "text"}
        />)
            .toJSON();
        expect(tree).toMatchSnapshot();
});
