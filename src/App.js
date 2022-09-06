import logo from './logo.png';
import './App.css';

import './App.css';

import {useCallback, useEffect, useState} from "react";

import { wordsList } from './data/names';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]


function App() {
  const guessesQtyDefault = 5;
  const [guessesQty, setGuessesQty] = useState(guessesQtyDefault)

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [dogName, setDogName] = useState("");
  const [tip, setTip] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setguessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setguesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  const pickDogAndTip =  useCallback(() => {
    const dogs = Object.keys(words)
    const dogNameStr = dogs[Math.floor(Math.random() * dogs.length)];
    const tip = words[dogNameStr];
    return { dogNameStr, tip};
  }, [words]);

  const normalize = (str) => {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }

  const startGame = useCallback(() => {
    clearLetterStates();
    setGuessesQty(guessesQtyDefault);

    const {dogNameStr, tip} = pickDogAndTip();
    let wordLetters = normalize(dogNameStr).split("");

    // //fill states
    setTip(tip);
    setDogName(dogName);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  },[pickDogAndTip,dogName]);

  const verifyLetter = (letter) => {
    const normalizedLetter = normalize(letter);
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if(letters.includes(normalizedLetter)){
      setguessedLetters((actualguessedLetters) => [
        ...actualguessedLetters,
        normalizedLetter
      ]);
      setScore((actualScore) => actualScore + 10);
    } else {
      setWrongLetters((actualguessedLetters) => [
        ...actualguessedLetters,
        normalizedLetter
      ]);
      setguesses((actualGuesses) => actualGuesses - 1)
    }

  }

  const handleLetterClick = (letter) => {
    verifyLetter(letter)
  }

  const clearLetterStates = () => {
    setguessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    //win conditions
    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100);
      setguesses(guessesQty)
      startGame();
    }
  }, [guessedLetters,letters,startGame,guessesQty])

  const retry = () => {
    setScore(0);
    setguesses(guessesQty);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game  
          verifyLetter={verifyLetter}
          tip={tip}
          letters={letters} 
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          handleLetterClick={handleLetterClick}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      
    </div>
  );
}

export default App;
