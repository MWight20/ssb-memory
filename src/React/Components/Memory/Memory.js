import React from 'react'
import Card from '../Card/Card.js'
import Timer from '../Timer/Timer.js'

/*  
*    Memory.js:
*        -> this class component sets up the gameboard by creating a new game from a shuffled card deck, as well as rendering out the timer.
*/
class Memory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cards: [
            'Captain_Falcon',
            'Donkey_Kong',
            'Falco',
            'Fox',
            'Kirby',
            'Link',
            'Luigi',
            'Mario',
            'Ness',
            'Pikachu',
            'Roy',
            'Samus',
            'Captain_Falcon',
            'Donkey_Kong',
            'Falco',
            'Fox',
            'Kirby',
            'Link',
            'Luigi',
            'Mario',
            'Ness',
            'Pikachu',
            'Roy',
            'Samus',
            'redx',
            ],
            gameOver: false,
            options: props.options,
            game : [],
            time: props.time,
        }
    }

    /*
    *   url: https://www.code-boost.com/react-memory-game/
    *       -> used this to reference the randomizing of the cards array
    */ 
    componentDidMount() {
        const newGame = this.state.cards.sort(()=> Math.random() - 0.5);
        this.setState({
            game: newGame,
        });
    }

    render() {
        return(
            <div>
                <Timer time={this.props.time}/>
                <div className="GameBoard-content">
                    <Card gameOver={this.props.gameOver} game={this.state.game} />
                </div>
            </div>
            );
    }
};

export default Memory;