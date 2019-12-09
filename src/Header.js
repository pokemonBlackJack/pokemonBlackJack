import React, { Component } from 'react';
import pokemonball from "./assets/pokemonball.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { seeInstructions } from "./alert"


class Header extends Component {
	


	
	// 
	render() {
		return (

			<div className="headerComponent">
				
				<img className="pokemonball" src={pokemonball} alt=""/>
				<h1 className="positionRelative">PB <span>&trade;</span></h1>
				<FontAwesomeIcon onClick={()=>{seeInstructions()}}className = "infoCircle positionAbsolute" icon={faInfoCircle} />
				 
			</div>
		);
	}
}

export default Header