import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import {connect} from "react-redux";
import { containsCaseInsensitive } from "../helpers"
import "tachyons";
import "./App.css"
import {setSearchField} from "../actions";
import ErrorBoundary from "./ErrorBoundary";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    };
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => this.setState({robots: users}));
    }

    render() {
        const {robots} = this.state;
        const {searchField, onSearchChange} = this.props;

        const filteredRobots = robots.filter((robot) => {
            return containsCaseInsensitive(robot.username, searchField)
                || containsCaseInsensitive(robot.name, searchField)
                || containsCaseInsensitive(robot.email, searchField);
        });

        return !robots.length 
            ? <h1 className="tc">Loading...</h1>
            : (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 