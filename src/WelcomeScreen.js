import React, { Component } from 'react';
import './index.css';
import pika from "./assets/pikachuGif.gif"
import pikachuSound from './sounds/cries/25.ogg';
import { casinoBgm } from './alert';

class WelcomeScreen extends Component {
	pikachu = new Audio(pikachuSound);

	// Function to close the instruction screen/welcome window once the user selects number of players
	closeInstruction = (getPokemonFunction, playerCount) => {
		if (getPokemonFunction) {
			getPokemonFunction(playerCount);
			this.props.hideButtons();
		};
		
		}

	render() {
		return (
			<div className="welcomeScreen">

				<h1>Welcome To Pokemon BlackJack</h1>

				<div className="contentContainer">
					<img src={pika} alt="Pikachu putting up a peace sign"/>
					<ul>
						<li>The Goal of the game is to get your card values as close to 21 as possible without going over.</li>
						<li>Click “draw a card” to get a new card, and “stay” if you want to stay.</li>
						<li>Each player takes a turn, and the player closest to 21 wins the round.</li>
						<li>The first player to win 2 rounds wins the game.</li>
					</ul>
				</div>
			
				
					{this.props.showButtons ? 
					<div className="playerButtons">
						{/* Buttons calling function above to start the game/close the window */}
						<button onClick={() => {
						this.closeInstruction(this.props.getpokemon, 2);
						this.props.playerCount(2)}}>Player vs Player</button>
						<button onClick={() => {
						this.closeInstruction(this.props.getpokemon, 3);
							this.props.playerCount(3)
						}}>Player vs CPU</button>
					</div>
					:
					<div className="playerButtons">
						<button onClick={this.props.closeInstructions}>Ok</button>
					</div>
						
						}
		
			
			</div>
		);
	}
}

export default WelcomeScreen