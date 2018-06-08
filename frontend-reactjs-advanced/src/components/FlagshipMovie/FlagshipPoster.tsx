import * as React from "react";

export const FlagshipPoster = (props: {posterURL: string}) =>
    <div className="col-md-4">
        <div className="flagship-movie-poster">
            <img src={props.posterURL} />
        </div>
    </div>;
