import './Game.css'

const keyboardLetters = [
  'q','w','e','r','t','y','u','i','o','p',
  'a','s','d','f','g','h','j','k','l',
  'z','x','c','v','b','n','m'
]

const Game = ({
  tip,
  letters,
  guessedLetters,
  wrongLetters,
  handleLetterClick,
  guesses,
  score,
}) => {

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

      <div>
      Você ainda possui {guesses} tentativa(s)
      </div>


      <div className='keyboard'>
        {keyboardLetters.map((letter, i) => (
          <button id={'btn_' + letter} 
            className={'keyboard-letter' + (guessedLetters.includes(letter) || wrongLetters.includes(letter) ? " disable" : "")} 
            onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Game
