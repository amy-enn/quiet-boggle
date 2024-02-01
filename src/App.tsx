import { useState, useEffect } from 'react';
import './App.css';

// array of strings that each represent the face of a boggle dice
const dice: string[] = [
  "RIFOBX",
  "IYDEVL",
  "ANEDVZ",
  "PAMBJO",
  "GUELNW",
  "EOTISL",
  "UTOKND",
  "HYAGBR",
  "EHLRST",
  "ACITOA",
  "SORLND",
  "CEMOTU",
  "AILSUY",
  "LRVERH",
  "WIDQUK",
  "NSEEHG",
];

// rotation classes for the letters on the boggle board, which are applied randomly so some letters are rotated or upside down, like a real boggle board
const rotationClasses = ['rotate-0', 'rotate-90', 'rotate-180', 'rotate-270'];

// create the 4x4 boggle board grid in the DOM
const generateBoggleBoard = (): { letter: string; rotationClass: string }[][] => {

  // initialize an empty array to hold the 4x4 grid of letters and their rotation class
  const boggleBoard: { letter: string; rotationClass: string }[][] = [];

  // loop through each row (4)
  for (let row = 0; row < 4; row++) {
    // initialize an empty array to hold the letters and rotation classes for the current row
    const rowLetters: { letter: string; rotationClass: string }[] = [];

    // loop through each column in the current row (4)
    for (let col = 0; col < 4; col++) {
      // randomly select a die from the array
      const dieIndex = Math.floor(Math.random() * dice.length);
      const die = dice[dieIndex];
      // randomly select one of the letters from the chosen die
      const letterIndex = Math.floor(Math.random() * die.length);
      const letter = die[letterIndex];
      // randomly choose a rotation class for each letter
      const rotationClass = rotationClasses[Math.floor(Math.random() * rotationClasses.length)];
      // add the letter and its rotation class to the array
      rowLetters.push({ letter, rotationClass });
    }
    // push the row to the boggle board
    boggleBoard.push(rowLetters);
  }

  // console.log(boggleBoard);
  // return the fully created boggle board
  return boggleBoard;
}


function App() {

  // state management
  const [boggleBoard, setBoggleBoard] = useState<{ letter: string; rotationClass: string }[][] | null>(null);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGenerateBoard = () => {
    // create the boggle board and save in state
    setBoggleBoard(generateBoggleBoard());
    // 3 min timer
    setMinutes(3);
    setSeconds(0);
    setTimerRunning(true);
    setGameOver(false);
  };

  // decrement the timer each second and check if the game is over
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // stop the timer at 0
          clearInterval(timer);
          setTimerRunning(false);
          // time is out, end the game
          setGameOver(true);
        }
        else {
          // decrement minutes
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        // decrement seconds
        setSeconds(seconds - 1);
      }

    }, 1000);

    // clear the timer on component unmount
    return () => clearInterval(timer);
  }, [minutes, seconds]);


  return (
    <>
      <h1>Quiet Boggle</h1>
      <h2>🙉</h2>
      <hr></hr>
      <div className="card">
        <button onClick={handleGenerateBoard}>
          Boggle!
        </button>
        <div className={`boggle-board ${gameOver ? 'blur' : ''}`}>
          {boggleBoard && boggleBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((letter, colIndex) => (
                <div key={colIndex} className={`cell ${letter.rotationClass}`}>
                  {letter.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {timerRunning && (
          <div className="timer">
            <h3>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</h3>
          </div>
        )}
        {boggleBoard && gameOver && (
          <div className="game-over">
            <h2>Game Over</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
