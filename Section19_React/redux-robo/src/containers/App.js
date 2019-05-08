import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import {connect} from "react-redux";
import { containsCaseInsensitive } from "../helpers"
import "tachyons";
import "./App.css"
import {setSearchField, retrieveRobots} from "../actions";
import ErrorBoundary from "./ErrorBoundary";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        isPending: state.retrieveRobots.isPending,
        robots: state.retrieveRobots.robots
    };
}

// parameter state comes from index.js provider store state(rootReducers)
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(retrieveRobots())
    };
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
class App extends React.Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const {searchField, onSearchChange, robots, isPending} = this.props;

        const filteredRobots = robots.filter((robot) => {
            return containsCaseInsensitive(robot.username, searchField)
                || containsCaseInsensitive(robot.name, searchField)
                || containsCaseInsensitive(robot.email, searchField);
        });

        return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    { isPending 
                        ? <h1>Loading...</h1>
                        : <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    }
                </Scroll>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 