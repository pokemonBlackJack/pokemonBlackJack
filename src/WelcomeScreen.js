import React, { Component } from 'react';
import './index.css';
import pika from "./assets/pikachuGif.gif"

 class WelcomeScreen extends Component {
	
	closeInstruction = (getPokemonFunction, playerCount) => {
		if(getPokemonFunction){
                    getPokemonFunction(playerCount)
                };
		
		}

	 
	render() {
		return (
			<div className="welcomeScreen">
				<h1>Welcome To Pokemon BlackJack</h1>
				<div className="contentContainer">
					<img src={pika} alt=""/>
					<ul>
						<li>The Goal of the game is to get your card values as close to 21 as possible without going over.</li>
						<li>Click “draw a card” to get a new card, and “stay” if you want to stay.</li>
						<li>Each player takes a turn, and the player closest to 21 wins the round.</li>
						<li>The first player to win 2 rounds wins the game.</li>
					</ul>
				</div>
			
					<div className="playerButtons">
						<button onClick={() => {
						this.closeInstruction(this.props.getpokemon, 2);
						this.props.playerCount(2)}}>2 Player</button>
						<button onClick={() => {
						this.closeInstruction(this.props.getpokemon, 3);
						this.props.playerCount(3)}}>1 Player</button>
					</div>
		
			
			</div>
		);
	}
}

export default WelcomeScreen