import React from "react";

/*  
*    Card.js:
*        The 'Card' Component is largely responsible for processing the individual cards or tiles in play on the gameboard.
*        It renders the cards to the page, processes the card flips, checks card pairs, as well as checks the win condition on component updates.
*
*/
class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            game : props.game,
            matchesFound: 0,
            tileMatchIndexes: [],
            cardIdsFlipped: [],
            cardNamesFlipped: [],
            correctGuesses: 0,
            incorrectGuesses: 0,
            time: 0,
        } 
    };
    componentDidMount(){
    };

    componentDidUpdate(){
        //win condition
        if (this.state.matchesFound === 12) {
            this.props.gameOver(this.state.correctGuesses, this.state.incorrectGuesses);
        }
    };

    isFaceUp(index){
        if (this.state.cardIdsFlipped.includes(index.toString()) || this.state.tileMatchIndexes.includes(index.toString())){
            return (true)
        }
        else {
            return (false);
        }
    };

    cardFlip(index, name){
        let currentIdsFlipped = this.state.cardIdsFlipped;
        let currentNamesFlipped = this.state.cardNamesFlipped;

        if (currentIdsFlipped.length === 2){      
            this.checkForPair(currentNamesFlipped, currentIdsFlipped);
            this.setState({
                cardIdsFlipped: [index.toString()],
                cardNamesFlipped: [name]
            });
            return;
        }

        if(currentIdsFlipped.length === 0){   
            currentIdsFlipped.push(index.toString());
            currentNamesFlipped.push(name);
            this.setState({
                cardIdsFlipped: currentIdsFlipped,
                cardNamesFlipped: currentNamesFlipped
            });
            return;
        }
        else{ 

            currentIdsFlipped.push(index.toString());
            currentNamesFlipped.push(name);
            this.setState({
                cardIdsFlipped: currentIdsFlipped,
                cardNamesFlipped: currentNamesFlipped
            });

            //prevents clicking of same tile
            if (currentIdsFlipped[0]===index.toString())
            {
                this.setState({
                    cardIdsFlipped: [],
                    cardNamesFlipped: []
                });
                return;
            }
        }
        return;
    };

    checkForPair(currentNamesFlipped, currentIdsFlipped){
        if (currentNamesFlipped[0] === currentNamesFlipped[1]){
            const currentMatchesFound = this.state.matchesFound;
            const currentMatchesIndexes = this.state.tileMatchIndexes;
            const currentCorrectGuesses = this.state.correctGuesses;

            currentMatchesIndexes.push(currentIdsFlipped[0].toString());
            currentMatchesIndexes.push(currentIdsFlipped[1].toString());

            this.setState({
                matchesFound: currentMatchesFound + 1,
                tileMatchesIndexes: currentMatchesIndexes.sort((a,b)=> a-b),
                correctGuesses: currentCorrectGuesses + 1,
                cardNamesFlipped: [],
                cardIdsFlipped: []
            })
        }
        else{
            const currentIncorrectGuesses = this.state.incorrectGuesses;
            this.setState({
                incorrectGuesses: currentIncorrectGuesses + 1,
                cardNamesFlipped: [],
                cardIdsFlipped: []
            })
        }
    };


    renderCardTiles() {
        let cards = this.props.game.map((name,index)=>{
            return(
                <div key={index}>
                    <div id={name} onClick={() => {this.cardFlip(index, name)}} className={ this.isFaceUp(index)  ? "cardTile cardFront" + name : "cardTile cardBack"}></div>
                </div>
            )
        });
        return cards;
    };

    render() {
        return (
            <div className="GameBoard">
                <div className="GameBoard-score">
                        <div>Correct guesses: {this.state.correctGuesses}</div>
                        <div>Incorrect guesses: {this.state.incorrectGuesses}</div>
                </div>
                <div className="GameBoard-content">
                    {this.renderCardTiles()}
                </div>
            </div>
            
            
        ) 
    };
}

export default Card;