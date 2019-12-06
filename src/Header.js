import React, { Component } from 'react';
import Swal from 'sweetalert2'
import pika from './assets/pika.png'
import withReactContent from 'sweetalert2-react-content'
<<<<<<< HEAD
import pikachuSound from './sounds/cries/25.ogg';
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'



>>>>>>> master

 class Header extends Component {
	 
	pikachu = new Audio(pikachuSound)

	 seeInstructions = () => {

		 const MySwal = withReactContent(Swal)
		 MySwal.fire({
 				 onOpen: () => {
					MySwal.clickConfirm();
					this.pikachu.play()
  				}
		 }).then(() => {
				
  				return MySwal.fire({
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