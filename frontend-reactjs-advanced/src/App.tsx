import * as React from 'react';
import './App.css';

/*tslint:disable*/
import {callNetflixBackend} from "./libs/NetflixClient";
import {NavBarComponent} from "./components/NavBar/NavBarComponent";
import {HomepageContainer} from "./containers/HomepageContainer";
import {SearchContainer} from "./containers/SearchContainer";
import {searchQuery} from "./queries/searchQuery";
import {ISearchQueryResponse} from "./Models";
import {Footer} from "./components/Footer/Footer";

const homepageMovieId = 31798;

interface IGeneralApplicationState {
    isSearching: boolean;
    currentQuery: string;
    searchResults: ISearchQueryResponse;
}

export class App extends React.Component<any, IGeneralApplicationState> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentQuery: "",
            isSearching: false,
            searchResults: {},
        };

        this.setSearch = this.setSearch.bind(this);
    }

    public render() {
        console.log("App state : ", this.state);
        return (
        <div className="App">
            <NavBarComponent>
                <SearchContainer onSearch={this.setSearch}/>
            </NavBarComponent>
            <HomepageContainer flagshipMovieId={homepageMovieId} searchResults={this.state.searchResults} searchQuery={this.state.currentQuery}/>
            <Footer />
        </div>
        );
    }

    public setSearch(nextQuery: string) {
        console.info("Setting search");
        this.setState({
            currentQuery: nextQuery,
            isSearching: nextQuery !== "",
        }, () => this.doSearchQuery(this.state.currentQuery))
    }

    // Todo: move search result
    public doSearchQuery(checkAgainst: string) {
        console.info("Launching search");
        if (checkAgainst === this.state.currentQuery)
            callNetflixBackend(searchQuery(this.state.currentQuery))
                .then((result) => result.json()
                .then((data) => this.setState({searchResults: data})));
        else
            console.warn("Discarded change, seems like user has updated query.", this.state.currentQuery);
        }
}

export default App;
