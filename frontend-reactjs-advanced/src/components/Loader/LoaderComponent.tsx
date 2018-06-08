import * as React from "react";
import Logo from "../../images/happy_havoc.jpg";
import "./LoaderComponent.css";

export const LoaderComponent = () =>
    <div className="loader-container">
        <img src={Logo} /> <br />
        <h1>Please wait a few seconds I am fetching the data</h1>
    </div>;
