import * as React from "react";
/*tslint:disable*/
import {IFlagsipMovie, ILittleMovie} from "../Models";
import {SearchResultComponent} from "../components/Search/SearchResultComponent";
import {callNetflixBackend} from "../libs/NetflixClient";
import {movieDetailsQuery} from "../queries/searchQuery";
import {FlagshipMovieComponent} from "../components/FlagshipMovie/FlagshipMovieComponent";
import {SearchLoading} from "../components/Search/SearchLoading";
// import {FlagshipMovieComponent} from "../components/FlagshipMovie/FlagshipMovieComponent";

interface ISearchResultsContainerProps {
    searchResults: ILittleMovie[];

}

// : <FlagshipMovieComponent {... this.props.searchResults.filter(x => x.id === this.state.focusedContentId)[0]}/>

interface IsearchResultsContainerState {
    focusedContentId: number;
    focusedContentData?: IFlagsipMovie;
}

export class SearchResultsContainer extends React.Component<ISearchResultsContainerProps, IsearchResultsContainerState> {
    public constructor(props: ISearchResultsContainerProps) {
        super (props);

        this.state = {
            focusedContentId: 0,
            focusedContentData: undefined,
        };

        this.fetchMovie = this.fetchMovie.bind(this);
        this.onBackToSearch = this.onBackToSearch.bind(this);
    }

    public render() {
        console.log("This is a search result inside the container : ", this.props.searchResults);
        console.log("Inside state : ", this.state);
        return this.state.focusedContentId == 0
        ? (
            <div className="search-results-container">
                <h2> Resultats de la recherche : </h2><br />
                <div className="search-results-movies-container">
                    { this.props.searchResults.map(movie =>
                        <SearchResultComponent movie={movie} onClick={this.fetchMovie}/>)
                    }
                </div>
                <br />
            </div>
        )
        : this.state.focusedContentData && <FlagshipMovieComponent {...this.state.focusedContentData} onBackToSearck={this.onBackToSearch}/> || <SearchLoading />
    }

    private fetchMovie(movieId: number) {
        console.log("Fetching movie id : ", movieId);

        this.setState({
            focusedContentId: movieId,
        });

        callNetflixBackend(movieDetailsQuery(movieId))
            .then(data => data.json().then(movie => this.setState({focusedContentData: movie["data"]["movie"]})));
    }

    private onBackToSearch() {
        this.setState({
            focusedContentId: 0,
            focusedContentData: undefined,
        });
    }
}
