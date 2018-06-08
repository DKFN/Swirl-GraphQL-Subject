import * as React from "react";
import HappyHavoc from "../../images/happy_havoc.jpg";
import logo from '../../logo.svg';
import "./NavBarComponent.css";

export const NavBarComponent = (props: {children: JSX.Element}) => (
    <nav className="navbar navbar-default navbar-inverse bg-inverse">
        <div className="container-fluid">
            <div className="navbar navbar-header">
                <img src={HappyHavoc}/>
                <h2>MyNETFLIX</h2>
            </div>
            {props.children}
            <ul className="nav navbar-env">
                <h4><img src={logo}/>Reference</h4>
            </ul>
        </div>
    </nav>
);
