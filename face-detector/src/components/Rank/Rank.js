import React from "react";

const Rank = ({user}) => {
	return (
		<div>
			<div className="white f3">
				{`${user.prettyString()}`}
			</div>
			<div className="white f1">
				{`${user.entries}`}
			</div>
		</div>
	);
}
export default Rank