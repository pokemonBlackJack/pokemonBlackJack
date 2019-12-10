import React, { Component } from 'react';
import PlayerContainer from "./PlayerContainer";


 class PokemonPlayer extends Component {
	render() {
		return (
			<div className="pokemonPlayer positionRelative">
				
				    {this.props.getPokemon.map((pokemon, index) => {
						return <div key={pokemon.id} className="playerPokemonContainer">
							<PlayerContainer cards={this.props[`player${index + 1}Cards`]} player={`Player ${index + 1}`} score={this.props[`player${index + 1}Score`]} flipable={(this.props.currentPlayer === (index + 1) && !this.props.hideCards) || this.props.showAll ? true : false} cleanBoard={this.props.cleanBoard} />
							<div className="playerPokemonDiv">
								<p>{pokemon.firstPokemon}</p>
								<img className={`pokemon ${this.props.winner !== null && this.props.winner !== (index + 1) ?  "faint" : ""}`} src={pokemon.firstPokemonImg} alt={`a ${pokemon.firstPokemon} ready to battle`} />
								<span className="imageShadow"></span>
								<div className={`healthBar`}>
									<div className={index === 0 ? (
										this.props[`player2Score`] === 1 ? "halfHealth" : this.props[`player2Score`] === 2 ? "noHealth" : "fullHealth") : (
											this.props[`player1Score`] === 1 ? "halfHealth" : this.props[`player1Score`] === 2 ? "noHealth" : "fullHealth") }>
												

									</div>
								</div>

							</div>
         			 	</div>
       			 })}
				<p className="positionAbsolute">VS</p>	

			</div>
		);
	}
}

export default PokemonPlayer