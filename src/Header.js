import React, { Component } from 'react';
import Swal from 'sweetalert2'
import pika from './assets/pika.png'
import withReactContent from 'sweetalert2-react-content'
import pikachuSound from './sounds/cries/25.ogg';
import instructionBgm from './sounds/instructionBgm.ogg';
import playBgm from './sounds/playBgm.ogg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import pokeball from './assets/pokeball.gif';



class Header extends Component {
	
	pokeballBg = pokeball;
	pikachu = new Audio(pikachuSound);
	casinoBgm = new Audio(instructionBgm);
	playBgm = new Audio(playBgm);

	seeInstructions = () => {

		const MySwal = withReactContent(Swal)
		MySwal.fire({
				onOpen: () => {
					MySwal.clickConfirm();
					setTimeout(() => (this.pikachu.play()), 500);
			}
		}).then(() => {
				
			return MySwal.fire({
					onOpen: () => {
						this.casinoBgm.play();
					},
					onClose: () => {
						this.casinoBgm.pause();
						this.casinoBgm.currentTime = 0;
						this.playBgm.play();
					},
					title: "Welcome To Pikachu BlackJack!",
					text: "The rules are simple. Player 1 goes first, and will click 'Hit Me' to total their cards as close to 21 without going over. Once they click 'stay', it's time for Player 2. ",
					icon: "info",
					imageUrl: pika,
					imageHeight: 200,
					imageWidth: 250,
					showConfirmButton:true,
					customClass: 'swal-wide',
					
					
				  })
			})	
	 }
	
	// 
	render() {
		return (

			<div className="headerComponent">

				
				<h1 className="positionRelative">Pikachu BlackJack</h1>
				<FontAwesomeIcon onClick={this.seeInstructions}className = "infoCircle positionAbsolute" icon={faInfoCircle} />
				{/* Instructions
				<button onClick={this.seeInstructions}>Click Me</button> */}
				 
			</div>
		);
	}
}

export default Header