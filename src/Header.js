import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { seeInstructions } from "./alert"


class Header extends Component {
	


	
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