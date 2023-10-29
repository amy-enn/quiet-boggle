import { useState, useEffect } from 'react';
import { generateBoggleBoard } from './Boggle';
import './App.css';

function App() {
  const [boggleBoard, setBoggleBoard] = useState<string[][] | null>(null);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const handleGenerateBoard = () => {
    setBoggleBoard(generateBoggleBoard());
    setMinutes(3);
    setSeconds(0);
    setTimerRunning(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setTimerRunning(false)
        }
        else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);


  return (
    <>
      <h1>🙉 Quiet Boggle 🙉</h1>
      <p><em>A React App by Imp0ster</em></p>
      <hr></hr>
      <div className="card">
        <button onClick={handleGenerateBoard}>
          Boggle!
        </button>
        <div className="boggle-board">
          {boggleBoard && boggleBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((letter, colIndex) => (
                <div key={colIndex} className="cell">
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>


        {timerRunning && (
          <div className="timer">
            {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
