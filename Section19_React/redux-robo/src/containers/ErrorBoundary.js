import React, { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError : false
		};
	}

	//React16+, basically a try-catch
	componentDidCatch(error, info) {
		this.setState({hasError: true});
	}

	render() {
		if (this.state.hasError) {
			return <h2>Oops. We've encountered an error.</h2>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;