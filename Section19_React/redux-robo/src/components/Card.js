import React from "react";

const Card = ({name, email, username, id}) => {
    return (
        <div className="tc bg-light-green dib br3 pa2 ma2 grow bw2 shadow-5">
            <img alt="robots" src={`https://robohash.org/${username}${id}?140x140`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;