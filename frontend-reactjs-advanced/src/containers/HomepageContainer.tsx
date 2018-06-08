/* tslint:disable */
import * as React from "react";
import {callNetflixBackend} from "../libs/NetflixClient";
import {homepageQuery} from "../queries/homepageQuery";
import {HomepageView} from "../components/HomepageView";
import {IFlagsipMovie, IHomepageResponse, ISearchQueryResponse} from "../Models";
import {FlagshipMovieComponent} from "../components/FlagshipMovie/FlagshipMovieComponent";
import {StratesContainer} from "./StratesContainter";
import {SearchLoading} from "../components/Search/SearchLoading";
import {SearchResultsContainer} from "./SearchResultsContainer";
import {movieDetailsQuery} from "../queries/searchQuery";

interface IHomepageContainerProps {
    flagshipMovieId: number;
    searchResults: ISearchQueryResponse;
    searchQuery: string;
}

interface IHomepageContainerState {
    homepageData: IHomepageResponse;
    usermovie?: IFlagsipMovie;
    userOldPos: number;
    isSearching: boolean;
}

export class HomepageContainer extends React.Component<IHomepageContainerProps, IHomepageContainerState> {
    public constructor(props: IHomepageContainerProps) {
        super(props);

        this.state = {
            homepageData: {},
            usermovie: undefined,
            userOldPos: 0,
            isSearching: false,
        };

        // In JS or TS beware of SCOPE !! this is relative !! So if you want it to be tied
        // To your class even in lambdas etc ... BIND THE SCOPE !
        this.updateHomepageData = this.updateHomepageData.bind(this);
        this.onclickContent = this.onclickContent.bind(this);
    }

    // This is the render function called by React interally to perform batched updates to the UI
    public render() {
        console.log("Current props : ", this.props);
        console.log("Current state: ", this.state);

        // If data is defined, I got a valid answer from server
        return this.state.homepageData.data
            ? <HomepageView>
                { this.props.searchQuery !== ""
                    ? this.props.searchResults.data && <SearchResultsContainer searchResults={ this.props.searchResults.data.search}/>
                        || <SearchLoading />
                    : <FlagshipMovieComponent
                        {... this.state.usermovie ? this.state.usermovie : this.state.homepageData.data.movie}

                        onBackToSearck={() => this.state.usermovie
                            ? this.setState({usermovie: undefined}, () => window.scrollTo(0, this.state.userOldPos))
                            : undefined
                        }

                    />
                }
                <StratesContainer strates={this.state.homepageData.data.strates} onClick={this.onclickContent}/>
            </HomepageView>
            : <SearchLoading />;
    }

    // Learn about lifecycle hooks here, when the componenent has Loaded, then I do a query
    // to get revelant data
    // https://reactjs.org/docs/state-and-lifecycle.html
    public componentDidMount() {
        callNetflixBackend(
            homepageQuery(this.props.flagshipMovieId)
        )
        // If it is successfull then I use this to update my state
        .then(this.updateHomepageData)
        // there is apocalypse handler
        .catch((reason: any) =>
            console.error("Big error occured, check the Network part of console", reason));
    }

    public onclickContent(contentId: number) {
        this.setState({userOldPos: window.pageYOffset});

        callNetflixBackend(movieDetailsQuery(contentId))
            .then(
                response => response
                    .json()
                    .then(content => this.setState({usermovie: content["data"]["movie"]}))
            );

        window.scrollTo(0, 0);
    }

    private updateHomepageData(response: Response) {
        response.json().then(data => {
            this.setState({
                homepageData: data,
            });
        });
    }

}
