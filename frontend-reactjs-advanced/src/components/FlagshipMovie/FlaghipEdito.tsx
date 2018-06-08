import * as React from "react";
import {IFlagsipMovie} from "../../Models";
import {YoutubeVideo} from "../YoutubeVideo";

export const FlagshipEdito = (props: IFlagsipMovie) =>
    <div className="flagship-movie-content col-md-10">
        <div className="flagship-movie-infos" >
            <span className="flagship-movie-title">
                {props.title}
            </span> <br/>
            <span className="flagship-movie-director">
                {props.director}
            </span>
            <span className="flagship-movie-releaseDate">
                {props.releaseDate}
            </span> <br/><br/>
        </div>

        <div className="flagship-movie-youtube" style={{textAlign: "right", position: "relative"}}>
            { props.trailerYoutubeId &&
                <YoutubeVideo youtubeId={props.trailerYoutubeId}/>
            }
        </div>
        <div className="flagship-movie-synopsis">
            {props.synopsis}
        </div>
    </div>;
