import * as React from "react";

export const HomepageView = (props: {children: JSX.Element[]}) =>
    <div className="wrapper">
        { ...props.children }
    </div>;
