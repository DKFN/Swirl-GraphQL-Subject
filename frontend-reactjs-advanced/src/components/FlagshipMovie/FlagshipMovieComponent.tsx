import * as React from "react";

/* tslint:disable */
import {FlagshipEdito} from "./FlaghipEdito";
import "./Flagship.css";
import {IFlagsipMovie} from "../../Models";
import {FlagshipPoster} from "./FlagshipPoster";
import {BackToSearchBadge} from "./BackToSearchBadge";
import {FlagshipComments} from "./FlagshipComments";

export const FlagshipMovieComponent = (props: IFlagsipMovie & {onBackToSearck?: () => void}) =>
    <div className="panel panel-default flagship-movie-container"
         style={{backgroundImage: `url("${props.backdrop}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
        <FlagshipPoster posterURL={props.poster}/>
        <FlagshipEdito {...props} />
        {props.onBackToSearck && <BackToSearchBadge onClick={props.onBackToSearck}/>}
        <FlagshipComments {...props}/>
    </div>;
