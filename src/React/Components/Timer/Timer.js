import React from "react";

export const StartTimer = (isActive, isPaused) => {
  let interval = null;
    if (isActive && isPaused === false) {
        interval = setInterval(() => {
            return ((t) => t + 10);
        }, 10);
    }
    return () => {
    clearInterval(interval);
    };
}

/*  
*    url: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
*           -> I referenced code from here to render the correct Minutes and Seconds digits
*/
export default function Timer(props) {
  return (
    <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
}