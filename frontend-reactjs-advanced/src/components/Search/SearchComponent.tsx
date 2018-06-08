import * as React from "react";
import "./Search.css";

export const SearchComponent = (props: {onChangeHandler: (query: string) => void, value: string}) =>
    <div className="home-search-container">
        <input type="text"
               onChange={(e: any) => props.onChangeHandler(e.target.value)}
               value={props.value}
        />
    </div>;
