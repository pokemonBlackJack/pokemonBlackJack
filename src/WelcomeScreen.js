import React, { Component } from 'react';
import './index.css';
import pika from "./assets/pikachuGif.gif"

 class WelcomeScreen extends Component {
	
	 
	render() {
		return (
			<div className="welcomeScreen">
				<h1>Welcome To Pokemon BlackJack</h1>
				<div className="contentContainer">
					<img src={pika} alt=""/>
					<ul>
						<li>The Goal of the game is to get your card values as close to 21 as possible without going over.</li>
						<li>Player 1 goes first, click “draw a card” to get a new card, and “stay” if you want to stay.</li>
						<li>Player 2 goes next, and will repeat step 2.</li>
						<li>The closest player to 21 wins! The player than wins 2/3 games will have their pokemon evolve.</li>
					</ul>
				</div>
				<button className="welcomeButton"onClick={this.closeInstruction}>Let's Play!</button>
				
			
			</div>
		);
	}
}

export default WelcomeScreen