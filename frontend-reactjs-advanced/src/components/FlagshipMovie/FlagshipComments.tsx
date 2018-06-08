import * as React from "react";

/*tslint:disable*/
import {IFlagsipMovie} from "../../Models";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Comments.css";

//<<img src={comment.avatar} style={{float: "left", height: 128, width: 160}}/>

export const FlagshipComments = (props: IFlagsipMovie) =>
    <div className="flagship-comments-container">
        <Carousel autoPlay={true} width="600px" infiniteLoop={true} showArrows={false} showIndicators={false} showStatus={false} showThumbs={false} dynamicHeight={true} transitionTime={500}>
        {
            props.comments.map(comment =>
                <div className="flagship-comment-container">
                    <div className="flagship-comment-text"> "{comment.text}" </div>
                    <div className="flagshipcomment-login"><i>-- {comment.login}</i></div>
                </div>)
        }
        </Carousel>
    </div>;
