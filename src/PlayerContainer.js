import React from "react";
import Card from './Card';


function PlayerContainer({player, score, cards, flipable, cleanBoard}) {
    return (
        <div className="playerContainer">
            <p>{player} score: {score}</p>
            <div className="playerCards">
                {cards.map((card, index) => {
                    return <Card key={index} altTag={`${card.number} of ${card.suit}`} cardFront={card.image} flipable={flipable} cleanBoard={cleanBoard} />
                })}
            </div>
        </div>
    )
}

export default PlayerContainer