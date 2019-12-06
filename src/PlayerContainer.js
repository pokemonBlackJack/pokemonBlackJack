import React from "react";
import Card from './Card';


function PlayerContainer({player, score, cards}) {
    return (
        <div className="playerContainer">
            <p>{player} score: {score}</p>
            <div className="playerCards">
                {cards.map((card) => {
                    return <Card cardFront={card.image} />
                })}
            </div>
        </div>
    )
}

export default PlayerContainer