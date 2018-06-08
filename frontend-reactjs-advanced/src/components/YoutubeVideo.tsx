import * as React from "react";

export const YoutubeVideo = (props: {youtubeId: string}) =>
    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${props.youtubeId}?rel=0&amp;showinfo=0`}/>;
