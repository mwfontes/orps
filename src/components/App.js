import React from 'react';
import Player from './Player';
import Commands from './Commands';
import swal from 'sweetalert2';

class App extends React.Component {
    
    constructor (props) {
        
        super (props);

        this.winsOpponent = 0;
        this.winsPlayer = 0;
        this.winsDraws = 0;
        this.gameOver = false;

        // Context binding
        this.draw = this.draw.bind(this);
        this.restart = this.restart.bind(this);
        this.playerChoosing = this.playerChoosing.bind(this);
    }


    draw() {
        // Aborts if the player haven't chosen a hand
        if (this.refs.player.state.hand.value === -1) return;

        // Aborts if the game is already over
        if (this.gameOver) return;
        
        // console.log(this.refs.player.getHands());
        // Shuffles a hand for the computer
        const numHands = this.refs.opponent.getHands().length;
        const rndHandNum = Math.floor(Math.random() * numHands); // from 0 to 2
        const opponentHand = this.refs.opponent.getHands()[rndHandNum];

        // Apply the hand to the opponent
        this.refs.opponent.setHand(opponentHand);

        // gets the player hand
        const playerHand = this.refs.player.state.hand;

        // checks who won the round
        // PLAYER
        if (playerHand.beats === opponentHand.value) {
            // Visually updates the score
            this.refs.commands.updateScore(0,1);
            // Counts player victories
            this.winsPlayer++;
        }
        // OPPONENT
        else if (opponentHand.beats === playerHand.value) {
            // Visually updates the score
            this.refs.commands.updateScore(1,0);
            // Counts player victories
            this.winsOpponent++;
        }
        // DRAW
        else {
            this.draws++;
        }

        this.checkVictory();
    }


    checkVictory() {
        if (this.winsOpponent >= 3) {
            // Prevents the player from make further plays
            this.gameOver = true;
            
            // Show result
            swal({
                title: 'You lost!',
                type:'warning'
            });
        }
        if (this.winsPlayer >= 3) {
            // Prevents the player from make further plays
            this.gameOver = true;
            
            // Show result
            swal({
                title: 'You won!',
                type:'success'
            });
        }

        if (this.gameOver) {
            this.refs.commands.setState({
                drawButtonDisplay: 'none' 
            });
        }
    }

    restart() {
        this.winsOpponent = 0;
        this.winsPlayer = 0;
        this.winsDraws = 0;
        this.gameOver = false;
        this.refs.commands.resetScore();
        this.refs.opponent.hideHands();
        this.refs.player.hideHands();
        this.refs.commands.setState({
            drawButtonDisplay: 'block' 
        });
    }

    // Accessed when the player starts to chose another hand
    playerChoosing() {
        this.refs.opponent.hideHands();
    }


    // LIFECYCLE METHODS
    componentDidMount() {
        swal({
            title: 'Welcome to ORPS Deluxe!',
            html: 'Pick a hand by tapping over your side<br/>bellow the line and then choose \"Draw!\".<br/><br/>This is a best of five game. Good luck!'
        });
    }

    
    render () {
        return (
            <main>
                <div className='content'>
                    <Player ref='opponent' name='Opponent'/>
                    <Player ref='player' name='You' playerChoosing={this.playerChoosing} parent={this} />
                    <Commands ref='commands' draw={this.draw} restart={this.restart} />
                </div>
            </main>
        );
    }
}

export default App;