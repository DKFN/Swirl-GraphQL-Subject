import * as React from "react";
import {ILittleMovie} from "../../Models";

export const StrateMovie = (props: ILittleMovie & {onClick?: (nextid: number) => void}) =>
    <div className="strate-movie-container" onClick={() => props.onClick && props.onClick(props.id)}>
        <div className="strate-poster">
            <img width="256px" src={props.poster}/>
        </div>
        <div className="strate-movie-title">
            { props.title.length > 20 ? props.title.substring(0, 19) + "..." : props.title }
        </div>
    </div>;
