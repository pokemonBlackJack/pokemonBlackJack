import React from 'react';
import pokemonCardBack from './assets/pokemon-card-back.png';

// Just waiting for the prop to go through after we mapped it.
const Card = ({ cardFront, flipable }) => {
  return (
    <div className={`card-container`}>
      <div className='card'>
        <div className={`card-back  ${flipable ? "flipable" : ""}`}>
          <img src={pokemonCardBack} alt='The back of the card' />
        </div>
        <div className={`card-front  ${flipable ? "flipable" : ""}`}>
          <img src={cardFront} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Card;
