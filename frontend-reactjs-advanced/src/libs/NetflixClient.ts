// Browser compatibillity layer, the first defined is returned to Fetch
const Fetch =  window.fetch || self.fetch || fetch;

const backendURL = "swirl-netflix.deadlykungfu.ninja";
// const backendURL = "localhost:9000";

// There it is the same idea than the callNetflixBackend function from the JQuery example
// Please refer to the JQuery docs if you want to know more about the function.
// The only notable difference is that it uses a
export const callNetflixBackend = (targetQuery: string) => {
    if (!Fetch) {
        alert("Fetch is not available in your browser, update !");
    }

    const targetRequest: RequestInit = {
        body: targetQuery,
        headers: new Headers(),
        method: "POST",
    };

    return Fetch(`http://${backendURL}/graphql`, targetRequest);
};
