import * as React from "react";
import {ILittleMovie, IStrate} from "../../Models";
import {StrateMovie} from "./StrateMovie";
import "./Strates.css";

interface IStrateComponent {
    strate: IStrate;
    onclick: (nextId: number) => void;
    hovered: boolean;
    n: number;
    onHover: (nextId: number) => void;
}

export const StrateComponent = (props: IStrateComponent) =>
    <div className="strate-container"
         onMouseEnter={() => props.onHover(props.n)}
         onMouseLeave={() => props.onHover(-1)}
    >
        <div className="strate-title" style={{color: props.hovered ? "red" : "white"}}>
            {props.strate.title}
        </div>
        { props.strate.movies && props.strate.movies.map((movie: ILittleMovie, key: number) =>
            <StrateMovie {...movie} key={key} onClick={props.onclick}/>) }
    </div>;