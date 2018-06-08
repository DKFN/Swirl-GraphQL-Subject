import * as React from "react";
import Logo from "../../images/happy_havoc.jpg";

const phrases = [
    "So everyone just pretends to understand... and pretends to be understood.",
    "If it gets any hotter in here, I might have to get naked... just kidding, I'm always naked.",
    "Upupupupupu,",
    "I came to realize something. Parenthesis are amazing! No matter how negative something sounds, if you throw \"LOL\" in some parentheses behind it - it becomes positive!"
];

export const SearchLoading = () =>
    <div className="search-loading" style={{textAlign: "center"}}>
        <img src={Logo} className="rotating spinner"/><br />
        <h2> "{ phrases[Math.floor(Math.random()  * Math.floor(phrases.length))] }" </h2> <br />
        <i>Hope's Peak Engineering</i>
    </div>;
