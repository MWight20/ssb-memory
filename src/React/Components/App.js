import '../../Styles/App.css';
import Memory from './Memory/Memory.js';
import React from "react";

/*
*     url: https://www.w3schools.com/howto/howto_css_flip_card.asp
*         (css)-> I referenced this page to remember the syntax for the 'transform: rotateY();' line
* 
*      url: https://www.reddit.com/r/smashbros/comments/9kwyz8/high_res_ultimate_artworks_with_clean_labeling/ (character portrait renders)
*      url: https://assets.melee.tv/  (background image)
*      url: https://flyclipart.com/image-smash-ball-png-318757 (smash ball render)
*         (IMGs)-> All of the assets and PNGs were used from the links above.
*/


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: null,
      time: null,
      isActive: true,
      isPaused: false
    };

  }
  // const [options, setOptions] = useState(null);
  // const [time, setTime] = useState(0);
  // const [isActive] = useState(true);
  // const [isPaused, setIsPaused] = useState(false);

  /*
   *    url: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
   *          -> In this section I reference the overall function pattern for setting interval and utilizing it in useEffect() to generate Minutes/Seconds
  */
  componentDidMount() {
    
  }

  // useEffect(() => {

  //   let interval = null;
  //   if (isActive && isPaused === false) {
  //       interval = setInterval(() => {
  //           setTime((t) => t + 10);
  //       }, 10);
  //   }
  //   return () => {
  //   clearInterval(interval);
  //   };
  // }, [isActive, isPaused]);

  componentDidUpdate(){
    this.countUp();
  }

  countUp = () => {
    let seconds = this.state.time + 1;
    this.setState({
      time: seconds
    })
    return this.state.time
  }

  setOption = (option) => {
    this.setState({ options: option})
  }

  setPausedState = (gameisPaused) => {
    this.setState({ isPaused: gameisPaused})
  }

  setTime = (newTime) => {
    this.setState({ time: newTime})
  }

  /*
   *    url: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
   *          -> I referenced the Math function to render minutes and seconds
   * 
   *    url: https://stackoverflow.com/questions/63311845/unexpected-use-of-confirm-no-restricted-globals
   *          -> referenced for window.confirm()
  */
  gameOver(correctGuesses, incorrectGuesses) {
    if (window.confirm("The game has been finished in " 
          + Math.floor((this.state.time / 60000) % 60).toString() +" Minutes and "
          + Math.floor((this.state.time / 1000) % 60).toString() +" seconds, with " 
          + correctGuesses + " correct guesses and "
          + incorrectGuesses + " incorrect guesses! " 
          + "Would you like to play another?" ))
      {
          this.setState({options: null})
      }
      else{
          this.setState({
            options: 1,
            isPaused: true
          })
      }
  }

  // function gameOver(correctGuesses, incorrectGuesses){
  //     if (window.confirm("The game has been finished in " 
  //         + Math.floor((time / 60000) % 60).toString() +" Minutes and "
  //         + Math.floor((time / 1000) % 60).toString() +" seconds, with " 
  //         + correctGuesses + " correct guesses and "
  //         + incorrectGuesses + " incorrect guesses! " 
  //         + "Would you like to play another?" ))
  //     {
  //         setOptions(null);
  //     }
  //     else{
  //         setOptions(1);
  //         setIsPaused(true);
  //     }
  // }

  /*
   *    url: https://www.code-boost.com/react-memory-game/
   *          -> I loosely followed some of the overall structure and adapted it to my version of the project.
   *          -> While I didn't use a lot of code 1-to-1, this reference helped me to get an overall big picture 
   *              for solving the problem and how I'd need to go about structuring and thinking about the overall solution.
   * 
   *          -> (e.g.- for things like the "{options ? () : ()}" conditional statements, I borrowed some of the overall ideas)
  */
    render(){
      return (
        <div className="App">
          <div className="GameBoard-container">
          <h1 className="GameBoard-title">
            <div className="smash-ball-logo" alt="" id="left-sb-logo"></div>
            <div className="title-text">Super Smash Brothers Memory Game</div>
            <div className="smash-ball-logo" alt="" id="right-sb-logo"></div>
          </h1>
            { (this.state.options) ? (
              <Memory 
                options ={ this.state.options} 
                gameOver={ this.gameOver }
                time={ this.state.time }
              />
            ): (
                <div className="GameBoard-menu">
                  <h3>To win you must use your brain!... </h3>
                  <p>
                    Individially select tiles in pairs to obtain matches of the selected tile's pictures. 
                    Once you find all the matches on the game board, the game is over.
                  </p>
                  <button className="startGame-btn" onClick={()=> { 
                    this.setOption(1); 
                    this.setPausedState(false); 
                    this.setTime(0); }}
                  >
                      Click Here to Start the Game
                  </button>
                </div>
            )}
          </div>
        </div>
      );
  }
}
