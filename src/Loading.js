import React, { Component } from 'react';
import './index.css';
import ashGif from './assets/ash.gif'

 class Loading extends Component {
	render() {
		return (
			<div className="loadingScreen">
				  <h3>Hang tight while the trainers catch the Pokemon for your battle!</h3> 
				  <img className ="ashGif"src={ashGif} alt=""/> 
				  
			</div>
		);
	}
}

export default Loading