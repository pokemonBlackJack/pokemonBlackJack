import React, { Component } from 'react';
import pokeball from "./assets/pokeball-icon-transparent-20.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { seeInstructions } from "./alert"


class Header extends Component {
	
	
	// 
	render() {
		return (

			<div className="headerComponent">
				
				{/* <img className="pokemonball" src={pokemonball} alt=""/> */}
				<h2 className="positionRelative">Pokemon BlackJack! <span>&trade;</span></h2>
				<img src={pokeball} alt=""/>
				<FontAwesomeIcon onClick={()=>{seeInstructions()}}className = "infoCircle positionAbsolute" icon={faInfoCircle} />
				 
			</div>
		);
	}
}

export default Header