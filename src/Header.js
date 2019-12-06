import React, { Component } from 'react';
import Swal from 'sweetalert2'
// import Animate from 'animate.css-react'
// import 'animate.css/animate.css'
import pika from './assets/pika.png'
import withReactContent from 'sweetalert2-react-content'


 class Header extends Component {
	 
	 seeInstructions = () => {

		 const MySwal = withReactContent(Swal)
		 MySwal.fire({
 				 onOpen: () => {
    				MySwal.clickConfirm()
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

				
				<h1 className="animate fadeIn">Pikachu BlackJack</h1>
				{/* </Animate> */}
				<button onClick={this.seeInstructions}>Click Me</button>
				 
			</div>
		);
	}
}

export default Header