import React from "react";

import {Route} from "../../constants"

const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<nav style={{display:"flex", justifyContent:"flex-end", padding: "1rem"}}>
				<p 
					onClick={() => onRouteChange(Route.SIGN_OUT)}
					className="f3 link dim black underline pa3 pointer">Sign out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display:"flex", justifyContent:"flex-end", padding: "1rem"}}>
				<p 
					onClick={() => onRouteChange(Route.SIGN_IN)}
					className="f3 link dim black underline pa3 pointer">
					Sign In
				</p>
				<p 
					onClick={() => onRouteChange(Route.REGISTER)}
					className="f3 link dim black underline pa3 pointer">
					Register
				</p>
			</nav>
		);
	}
}

export default Navigation