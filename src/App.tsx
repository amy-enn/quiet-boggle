import { useState, useEffect } from 'react';
import './App.css';

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

const rotationClasses = ['rotate-0', 'rotate-90', 'rotate-180', 'rotate-270'];

const generateBoggleBoard = (): { letter: string; rotationClass: string }[][] => {
  const boggleBoard: { letter: string; rotationClass: string }[][] = [];
  for (let row = 0; row < 4; row++) {
    const rowLetters: { letter: string; rotationClass: string }[] = [];
    for (let col = 0; col < 4; col++) {
      const dieIndex = Math.floor(Math.random() * dice.length);
      const die = dice[dieIndex];
      const letterIndex = Math.floor(Math.random() * die.length);
      const letter = die[letterIndex];
      const rotationClass = rotationClasses[Math.floor(Math.random() * rotationClasses.length)];
      rowLetters.push({ letter, rotationClass });
    }
    boggleBoard.push(rowLetters);
  }

  console.log(boggleBoard);
  return boggleBoard;
}


function App() {
  const [boggleBoard, setBoggleBoard] = useState<{ letter: string; rotationClass: string }[][] | null>(null);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGenerateBoard = () => {
    setBoggleBoard(generateBoggleBoard());
    setMinutes(3);
    setSeconds(0);
    setTimerRunning(true);
    setGameOver(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setTimerRunning(false);
          setGameOver(true);
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
