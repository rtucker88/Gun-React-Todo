import * as React from "react";
import { Navbar as BlueprintNavbar, NavbarGroup, NavbarHeading, NavbarDivider, Button, Classes } from "@blueprintjs/core";

interface NavbarProps {

}

const Navbar: React.SFC<NavbarProps> = () => {
    return (<BlueprintNavbar>
            <NavbarGroup>
                <NavbarHeading>Gun-React-Todo</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="help" text="About" />
            </NavbarGroup>
        </BlueprintNavbar>);
};

Navbar.displayName = "Navbar";

export default Navbar;