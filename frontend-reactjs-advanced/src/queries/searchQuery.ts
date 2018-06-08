export const searchQuery = (queryString: string) => `
    query {
        search (query: "${queryString}") {
            id
            title
            poster
            releaseDate
        }
    }
`;

export const movieDetailsQuery = (movieId: number) => `
    query {
        movie (id: ${movieId}) {
            id
            title
            synopsis
            backdrop
            poster
            director
            releaseDate
            trailerYoutubeId
            comments {
                avatar
                text
                login
            }
        }
    }
`;
