import React from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import { robots } from "./robots";
import { containsCaseInsensitive } from "./helpers"
import "tachyons";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots,
            searchField : ""
        };
    }

    onSearchChange = (event) => {
        this.setState({searchField : event.target.value});
    }

    render() {
        const searchStr = this.state.searchField;

        const filteredRobots = this.state.robots.filter((robot) => {
            //This is a naive solution and only works performantly
            //with fictionally small data sets...
            return containsCaseInsensitive(robot.username, searchStr)
                || containsCaseInsensitive(robot.name, searchStr)
                || containsCaseInsensitive(robot.email, searchStr);
        });

        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList robots={filteredRobots}/>
            </div>
        );
    }
};

export default App; 