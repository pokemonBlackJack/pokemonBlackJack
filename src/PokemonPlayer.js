import React, { Component } from 'react';


 class PokemonPlayer extends Component {
	render() {
		return (
			<div className="pokemonPlayer positionRelative">
				
				    {this.props.getPokemon.map((pokemon, index) => {
						return <div key={pokemon.id} className="playerPokemonContainer">
					
							<p>{pokemon.firstPokemon}</p>
							<img className="pokemon" src={pokemon.firstPokemonImg} alt={`a ${pokemon.firstPokemon} ready to battle`} />
							<span className="imageShadow"></span>
							<div className={`healthBar`}>
								<div className={index === 0 ? (
									this.props[`player2Score`] === 1 ? "halfHealth" : this.props[`player2Score`] === 2 ? "noHealth" : "fullHealth") : (
										this.props[`player1Score`] === 1 ? "halfHealth" : this.props[`player1Score`] === 2 ? "noHealth" : "fullHealth") }></div>
							</div>
         			 	</div>
       			 })}
				<p className="positionAbsolute">VS</p>	

			</div>
		);
	}
}

export default PokemonPlayer