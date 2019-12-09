import React, { Component } from 'react';
import './index.css';
import ashGif from './assets/ash.gif'

 class Loading extends Component {
	render() {
		return (
			<div className="loadingScreen">
				  <h2>Hang tight while the trainers go and catch the Pokemon for your battle!</h2> 
				  <img src={ashGif} alt=""/> 
				  
			</div>
		);
	}
}

export default Loading