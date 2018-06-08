import * as React from "react";
import {ILittleMovie} from "../../Models";

export const SearchResultComponent = (props: {movie: ILittleMovie, onClick: (id: number) => void}) =>
    <div className="search-result-movie" onClick={() => props.onClick(props.movie.id)}>
        <img src={props.movie.poster} width={128} height={192}/> <br />
        {props.movie.title}
    </div>;
