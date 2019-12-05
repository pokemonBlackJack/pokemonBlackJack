import React, { Component } from 'react';
import './App.css';
import ash from './assets/ash.png'
import ashGif from './assets/ash.gif'
// import {Animated} from "react-animated-css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'






 class Loading extends Component {
	

		 showLoading = () => {
			  
			  const MySwal = withReactContent(Swal)
				MySwal.fire({
 				 onOpen: () => {
    				MySwal.clickConfirm()
  				}
		 }).then(() => {
				
  				return MySwal.fire({
					  title: "Fetching Your Pokemon",
					  confirmButtonColor: "#142b68",
					  text: "Hang tight while the trainers go and catch the Pokemon for your battle ",
					 background: '#142b68',
  						backdrop: `rgba(19,43,104)`,
					  imageUrl: ashGif,
					  imageHeight: 400,
					  imageWidth: 800,
					  showConfirmButton:true,
					  customClass: 'swal-wide', 
					  
					  
				  })
			})



		 }

			
	

	render() {
		return (
			<div className="loadingScreen">
				
				<button onClick={this.showLoading}>Loading</button>
				    
			</div>
		);
	}
}

export default Loading