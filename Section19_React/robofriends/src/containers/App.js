import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { containsCaseInsensitive } from "../helpers"
import "tachyons";
import "./App.css"
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [], 
            searchField : ""
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField : event.target.value});
    }

    render() {
        const {robots, searchField} = this.state;

        const filteredRobots = robots.filter((robot) => {
            //This is a naive solution and only works performantly
            //with fictionally small data sets...
            return containsCaseInsensitive(robot.username, searchField)
                || containsCaseInsensitive(robot.name, searchField)
                || containsCaseInsensitive(robot.email, searchField);
        });

        return !robots.length 
            ? <h1 className="tc">Loading...</h1>
            : (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
};

export default App; 