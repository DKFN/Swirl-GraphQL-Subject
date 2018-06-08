import * as React from "react";
import BackArrow from "../../images/back.jpg";

export const BackToSearchBadge = (props: {onClick: () => void}) =>
<div className="flagship-back-to-search-container" onClick={props.onClick}>
    <img src={BackArrow} height={64}/>
</div>;