import React from 'react';
import imageButtonRestart from '../images/restart-game.svg';
import imageButtonDraw from '../images/draw.svg';

class Commands extends React.Component {
    
    constructor (props) {
        
        super (props);

        this.state = {
            score: [0, 0],
            drawButtonDisplay: 'block'
        };

        // Context bind
        this.updateScore = this.updateScore.bind(this);
    }

    updateScore(a, b) {
        let score = this.state.score;
        score[0] += a;
        score[1] += b;

        this.setState({
            score
        });
    }


    resetScore() {
        this.setState({
            score: [0, 0]
        });
    }
    
    render () {
        
        return (
            <div className='commands'>
                <div className='commands__line'></div>
                <img src={imageButtonRestart} className='commands__btn-restart' onClick={this.props.restart} />
                <img src={imageButtonDraw} ref='drawButton' className='commands__btn-draw' onClick={this.props.draw} style={{display: this.state.drawButtonDisplay}} />
                <div className='commands__score--opponent'>{this.state.score[0]}</div>
                <div className='commands__score--player'>{this.state.score[1]}</div>
            </div>
        );
    }
}

export default Commands;