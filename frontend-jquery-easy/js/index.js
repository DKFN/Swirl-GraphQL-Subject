const renderHomepage = (data) => {
    console.log(data);
    renderTopPageMovie(data["data"]["movie"]);
    renderAllStrate(data["data"]["strates"]);
};

// Here I just persist all my data to the HTML
const renderTopPageMovie = (dataForMovie) => {
    console.log(dataForMovie);

    // Animations
    $(".flagship-movie-content").css("opacity", 0);
    $(".flagship-movie-poster").css("opacity", 0);

    $(".flagship-movie-content").delay(1500).animate({
        opacity: 1,
    }, 1000);

    $(".flagship-movie-poster").delay(200).animate({
        opacity: 1,
    }, 1000);

    // Now I set the content I want based on data I received
    $(".flagship-movie-title").text(dataForMovie["title"]);
    $(".flagship-movie-director").text(dataForMovie["director"]);
    $(".flagship-movie-synopsis").text(dataForMovie["synopsis"]);
    $(".flagship-movie-releaseDate").text(dataForMovie["releaseDate"]);

    $(".flagship-movie-poster").append(`<img width="250px" style="float: left" src="${dataForMovie["poster"]}" />`);
    $(".flagship-movie-container").css('background-image', 'url("'+dataForMovie["backdrop"]+'")');
    $(".flagship-movie-youtube").append(makeYoutubeLink(dataForMovie["trailerYoutubeId"]));
};

const renderAStrate = (dataForMyStrate, strateKey) => {

    $(".home-strates-container").css("opacity", 0);
    $(".strate-poster").css("opacity", 0);

    $(".home-strates-container").delay(1500).animate({
        opacity: 1,
    }, 800);

    $(".strate-poster").delay(2200).animate({
        opacity: 1,
    }, 500);

    $(".home-strates-container")
        .append(
            buildStrateTemplate(
                strateKey,
                dataForMyStrate["title"],
                dataForMyStrate["poster"],
                dataForMyStrate["movies"]
        ));
};

const renderAllStrate = (dataForAllStrates) => {
    /*
     * This is equivalent to this :
     *
     * for (int i = 0; i < dataForAllStrates.length; ++i) {
     *      renderAStrate(dataForAllStrates[i]);
     * }
     *
     * But let's enjoy that we are not in C and we have nicer concepts :D
     */
    dataForAllStrates.map((strateData, key) => renderAStrate(strateData, key))
};

// As you can see there I create a getHomepage function, taking the homepageQuery and when I have a reponse from the back
// I attach an anonymous function, that will be executed when query is complete and it will call renderHomepage with the data
const getHomepage = () => callNetflixBackend(homepageQuery)
    .done((reponseData) => renderHomepage(reponseData));

// This is the "Main" of my webpage, it will be executed after the browser has loaded the "display" elements
$(document).ready(() => {
    getHomepage();
    $(".container").css("height", $(window).height());
});
