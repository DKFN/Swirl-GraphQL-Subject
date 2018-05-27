const callNetflixBackend = (targetQuery) => {
    if (typeof targetQuery !== "string") {
        console.error("The client only accepts strings as parameter !");
        return ;
    }

    return $.ajax({
        url: "http://45.76.45.208:9000/graphql",
        method: "POST",
        dataType: "json",
        contentType: "text/plain; charset=utf-8",
        data: targetQuery,
        processData: false
    });
};
