import * as React from "react";
import {StrateComponent} from "../components/Strate/StrateComponent";
import {IStrate} from "../Models";

interface IStratesContainerProps {
    strates: IStrate[];
    onClick: (contentId: number) => void;
}

interface IStratesContainerState {
    focusedStrateIndex: number;
}

export class StratesContainer extends React.Component<IStratesContainerProps, IStratesContainerState> {
    public constructor(props: IStratesContainerProps) {
        super(props);

        this.state = {
            focusedStrateIndex: -1,
        };

        this.setStrateHovered = this.setStrateHovered.bind(this);
        this.render = this.render.bind(this);
    }

    public render() {
        console.log("Gotten props : ", this.props);
        console.log("Gotten state : ", this.state);
        return (
            <div className="home-strates-container">
                {
                    this.props.strates
                        .map((strate: IStrate, key: number) =>
                        {
                            return <StrateComponent
                                strate={strate}
                                hovered={this.state.focusedStrateIndex === key}
                                onHover={this.setStrateHovered}
                                onclick={this.props.onClick}
                                key={key}
                                n={key}
                            />;
                        })
                }
            </div>
        )
    }

    private setStrateHovered(nextId: number) {
        this.setState({
            focusedStrateIndex: nextId,
        });
    }
}
