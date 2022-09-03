import "./StartScreen.css"
const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Ritinha's doguinhos</h1>
      <p>Click para iniciar</p>
      <button onClick={startGame}>Start</button>
    </div>
  )
}

export default StartScreen

