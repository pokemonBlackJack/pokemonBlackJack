import React, { Component } from 'react';
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import pikachuSound from './sounds/cries/25.ogg';
import instructionBgm from './sounds/instructionBgm.ogg';
import playBgm from './sounds/playBgm.ogg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import pokeball from './assets/pokeball.gif';
import alert, { seeInstructions } from "./alert"



class Header extends Component {
	
	pokeballBg = pokeball;
	pikachu = new Audio(pikachuSound);
	casinoBgm = new Audio(instructionBgm);
	playBgm = new Audio(playBgm);

	
	// 
	render() {
		return (

			<div className="headerComponent">

				
				<h1 className="positionRelative">Pokémon BlackJack</h1>
				<FontAwesomeIcon onClick={()=>{seeInstructions()}}className = "infoCircle positionAbsolute" icon={faInfoCircle} />
				{/* Instructions
				<button onClick={this.seeInstructions}>Click Me</button> */}
				 
			</div>
		);
	}
}

export default Header