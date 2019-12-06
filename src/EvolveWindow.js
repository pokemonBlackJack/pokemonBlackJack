import React, { Component } from 'react';
import evolutionAlert from './evolveWindowAlert'

class EvolveWindow extends Component {

    
    render() {
        return (
            <div>
                <button onClick={() => {
                    evolutionAlert((this.props.preName), (this.props.preImg), (this.props.preId), (this.props.postName), (this.props.postImg), (this.props.postId))}
                }>Evolve</button>
            </div>
        );
    };
};

export default EvolveWindow;