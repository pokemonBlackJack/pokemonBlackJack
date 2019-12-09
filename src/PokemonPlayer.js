import React, { Component } from 'react';


 class PokemonPlayer extends Component {
	render() {
		return (
			<div className="pokemonPlayer positionRelative">
				
				    {this.props.getPokemon.map((pokemon) => {
         		 return <div className="playerPokemonContainer">
					
            			<p>{pokemon.firstPokemon}</p>
            			<img src={pokemon.firstPokemonImg} alt="" />
						<span className="imageShadow"></span>
         			 	</div>
       			 })}
				<p className="positionAbsolute">VS.</p>	

			</div>
		);
	}
}

export default PokemonPlayer