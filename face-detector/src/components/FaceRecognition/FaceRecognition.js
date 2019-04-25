import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl, boxes}) => {
	return !imageUrl ? <div/> : (
		<div className="center ma">
			<div className="absolute mt2">
					<img id="inputImg" alt="Detected Faces" src={imageUrl} width="500px" height="auto"/>
					{boxes.map((box) => {
						const boxStyle = {top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol};
						return (<div className="bounding-box" style={boxStyle} />)
					})}
				}
			</div>
		</div>
	);
}
export default FaceRecognition