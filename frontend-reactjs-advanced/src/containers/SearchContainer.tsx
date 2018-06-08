import * as React from "react";
/*tslint:disable*/
import {ILittleMovie} from "../Models";
import {SearchComponent} from "../components/Search/SearchComponent";
import Timer = NodeJS.Timer;

interface ISearchConainerProps {
    onSearch: (query: string) => void;
}

interface ISearchContainerState {
    currentQuery: string;
    currentResults: ILittleMovie[];
}

export class SearchContainer extends React.Component<ISearchConainerProps, ISearchContainerState> {

    private currentTImouet: Timer;

    public constructor(props: ISearchConainerProps) {
        super(props);

        this.state = {
            currentQuery: "",
            currentResults: [],
    };

        this.onSearch = this.onSearch.bind(this);
    }


    public render() {
        return (
            <SearchComponent onChangeHandler={this.onSearch} value={this.state.currentQuery}/>
        );
    }

    public onSearch(queryString: string) {
        if (this.currentTImouet)
            clearTimeout(this.currentTImouet);

        this.currentTImouet = setTimeout(() => {
            console.log(">>> Timeout setted");
            this.props.onSearch(queryString);
        }, 250);

        this.setState({
            currentQuery: queryString,
        });

    }

}
