const buildStrateTemplate = (strateKey, title, poster, movies) => `
    <div class="strate-container">
        <div class="strate-title">
            ${title}
        </div>
        ${ movies.map(x => buildStrateMovie(x, strateKey)) }
    </div><br />
`;

const buildStrateMovie = (movieData, strateKey) => `
<div class="strate-movie-container">
    <div class="strate-poster">
        <img width="256px" src="${ movieData["poster"] }"/>
    </div>
    <div class="strate-movie-title">
        ${ movieData["title"].length > 28 ? movieData["title"].substring(0, 24) + "..." : movieData["title"] }
    </div>
</div>
`;
