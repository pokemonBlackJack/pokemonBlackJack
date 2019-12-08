import React from 'react';
import pokemonCardBack from './assets/pokemon-card-back.png';

// Just waiting for the prop to go through after we mapped it.
const Card = ({ cardFront, flipable, cleanBoard }) => {
  return (
    <div className={`card-container`}>
      <div className='card'>
        <div className={`card-back  ${flipable ? "flipable" : "hidden"} ${cleanBoard ? "clean" : ""}`}>
          <img src={pokemonCardBack} alt='The back of the card' />
        </div>
        <div className={`card-front  ${flipable ? "flipable" : "hidden"} ${cleanBoard ? "clean" : ""}`}>
          <img src={cardFront} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Card;
