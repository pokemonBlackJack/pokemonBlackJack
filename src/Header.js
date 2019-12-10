import React, { Component } from 'react';
import pokeball from "./assets/pokeball-icon-transparent-20.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
	

	render() {
		return (

			<div className="headerComponent">
				
				<h2 className="positionRelative">Pokemon BlackJack! <span>&trade;</span></h2>
				<img src={pokeball} alt="Pokeball"/>
				<FontAwesomeIcon onClick={ () => this.props.showInstructions()}
				className = "infoCircle positionAbsolute" icon={faInfoCircle} />
				 
			</div>
		);
	}
}

export default Header