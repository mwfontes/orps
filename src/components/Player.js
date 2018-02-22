import React from 'react';

import imageHandND from '../images/hand-not-defined.svg';
import imageHandRock from '../images/hand-rock.svg';
import imageHandPaper from '../images/hand-paper.svg';
import imageHandScissor from '../images/hand-scissor.svg';

class Player extends React.Component {
    
    constructor (props) {
        
        super (props);

        // Hands are declared here to easily extend if needed
        this.handND = { value: -1, beats: -1, name: 'Not Defined', image: imageHandND, style:{transform: 'rotate(0deg)'} };

        this.hands = [
            { value: 0, beats: 2, name: 'Rock', image: imageHandRock, style: {} },
            { value: 1, beats: 0, name: 'Paper', image: imageHandPaper, style: {} },
            { value: 2, beats: 1, name: 'Scissor', image: imageHandScissor, style: {} }
        ];

        this.state = {
            hand: this.handND
        };

        // Methods binds
        this.swapHand = this.swapHand.bind(this);
        this.setHand = this.setHand.bind(this);
        this.getHands = this.getHands.bind(this);
    }


    swapHand() {
        if (this.props.parent.gameOver) return;

        // First of all, Tell the app that the player is currently choosing
        // to hide the opponent's hand
        this.props.playerChoosing();

        // Cycle through the available hands
        let index = this.state.hand.value;
        index++;
        if (index >= this.hands.length) {
            index = 0;
        }

        // then set the hand state as the chosen hand
        this.setState({
            hand: this.hands[index]
        });
    }


    // Method accessed by other components
    setHand(_hand) {
        this.setState({
            hand: _hand
        });
    }


    // returns all the available hands
    getHands() {
        return this.hands;
    }


    // resets the hand to the default NOT DEFINED '???' hand
    hideHands() {
        this.setState({
            hand: this.handND
        });
    }

    
    render () {
        return (
            <div className={`player player--${this.props.name.toLowerCase()}`} onClick={this.props.name.toLowerCase() === 'you' ? this.swapHand : null}>
                <img src={this.state.hand.image} className='hand-image' draggable='false' style={this.state.hand.style} />
                <div className={`player__name player__name--${this.props.name.toLowerCase()}`}>
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export default Player;