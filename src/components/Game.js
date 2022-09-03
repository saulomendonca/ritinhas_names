import './Game.css'
import {useState, useRef} from "react";

const Game = ({
  verifyLetter,
  tip,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  }
  return (
    <div className='game'>
      <p className="points">
        Pontuação: <span>{score}</span>
      </p>
      <h1>Adivinhe o doguinho:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{tip}</span>
      </h3>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
        <div className="letterContainer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name='letter'
              maxLength={1}
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar!</button>
          </form>
          <p>Você ainda tem {guesses} tentativa(s)</p>
        </div>
        {wrongLetters.length > 0 && (
          <div className='wrongLettersContainer'>
            <p>Letras já utilizadas: 
              <span>
                {wrongLetters.join(", ")}
              </span>
            </p>
          </div>
        )}

    </div>
  )
}

export default Game
