const callNetflixBackend = (targetQuery) => {
    if (typeof targetQuery !== "string") {
        console.error("The client only accepts strings as parameter !");
        return ;
    }

    return $.ajax({
        url: "http://swirl-netflix.deadlykungfu.ninja/graphql",
        method: "POST",
        dataType: "json",
        contentType: "text/plain; charset=utf-8",
        data: targetQuery,
        processData: false
    });
};
