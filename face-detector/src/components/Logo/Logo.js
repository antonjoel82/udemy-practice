import React from "react";
import Tilt from "react-tilt";
import icon from "./face-detector-logo.png";
import "./Logo.css";

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{max: 50}} style={{height: 150, width: 150}}>
				<div className="tilt-inner pa3">
					<img style={{paddingTop: "1.5rem"}} src={icon} alt="Face Detector Logo"/>
				</div>
			</Tilt>
		</div>
	);
}
export default Logo