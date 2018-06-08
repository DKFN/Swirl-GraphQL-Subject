export interface ILittleMovie {
    id: number; // Jamais null ou undefined
    title: string;
    poster: string;
}

export interface IFlagsipMovie extends ILittleMovie {
    backdrop?: string; // Peut etre null ou undefined
    director: string;
    releaseDate: string;
    synopsis: string;
    trailerYoutubeId?: string;
    comments: IComment[];
}

export interface IComment {
    avatar: string;
    text: string;
    login: string;
}

export interface IStrate {
    name: string;
    title: string;
    movies: ILittleMovie[];
}

export interface IHomepageResponse {
    data?: { // Undefined when not fetched
        movie: IFlagsipMovie;
        strates: IStrate[];
    }
}

export interface ISearchQueryResponse {
    data?: {
        search: ILittleMovie[];
    }
}
