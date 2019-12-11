import React, { Component } from 'react';
import PlayerContainer from "./PlayerContainer";


class PokemonPlayer extends Component {
	
	healthCalculator = (player1Score, player2Score, player3Score, currentPlayer) => {
		const playersTotal = player1Score + player2Score + player3Score - currentPlayer ;
		return 110 - (100 * playersTotal / this.props.numberOfPlayers);
	}
		
	render() {
		return (
			<div className="pokemonPlayer positionRelative">
				
				{this.props.getPokemon.map((pokemon, index) => {
                    return <div key={index} className={`playerPokemonContainer 
                            ${this.props.numberOfPlayers === 3 && index === 0 
                                ? 
                            " wideDiv" 
                                : 
                            ""}`}>

                            <PlayerContainer 
                                cards={this.props[`player${index + 1}Cards`]} 
                                player={`Player ${index + 1}`} 
                                score={this.props[`player${index + 1}Score`]} 
                                flipable={(this.props.currentPlayer === (index + 1) && !this.props.hideCards) || this.props.showAll ? true : false} 
                                cleanBoard={this.props.cleanBoard} />

							<div className={`playerPokemonDiv`}>
								<p>{pokemon.firstPokemon}</p>
								<img 
                                className={`pokemon 
                                    ${this.props.winner !== null && this.props.winner !== (index + 1) 
                                        ? 
                                    "faint" 
                                        : 
                                    ""} 
                                    ${(this.props.numberOfPlayers === 3 && index === 1 ) || (this.props.numberOfPlayers === 2 && index === 0) 
                                        ? 
                                    "facingRight" 
                                        : 
                                    ""}`}
								src={pokemon.firstPokemonImg}
								alt={`a ${pokemon.firstPokemon} ready to battle`} 
								/>
                                <span className={`
                                    imageShadow ${this.props.winner !== null && this.props.winner !== (index + 1) 
                                        ? 
                                    "faint" 
                                        : 
                                    ""}`}></span>
								<div className={`healthBar`}>
									<div style={{
                                        width: `
                                            ${this.props.winner !== index + 1 && this.props.winner !== null 
                                                ? 
                                            0 
                                                :  
                                            this.healthCalculator(this.props.player1Score, this.props.player2Score, this.props.player3Score,this.props[`player${index + 1}Score`])}%`,

                                        backgroundColor: `
                                            ${this.healthCalculator(this.props.player1Score, this.props.player2Score, this.props.player3Score, this.props[`player${index + 1}Score`]) < 40 
                                                ? 
                                            `rgb(114, 12, 12)` 
                                                : 
                                            `seagreen`}`
									}}>

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