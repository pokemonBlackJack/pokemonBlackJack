import React, { Component } from 'react';
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import alert, { seeInstructions } from "./alert"




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