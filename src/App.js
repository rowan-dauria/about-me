import { useState } from 'react';
import './App.css';
import Board from './noughts-and-crosses';
import Container from './AudioVisualiser';

function MyButton({ onClick }) {

  return (
    <button onClick={onClick}>Let's play!</button>
  );
}

function App() {
  const [showNC, setShowNC] = useState(false);
  function onClick() {
    if (showNC) return;
    setShowNC(true);
  }
  return (
    <div className="App">
      <h1> Let's play Noughts and Crosses</h1>
      <MyButton onClick={onClick} />
      {showNC ? <Board /> : null}
      <Container/>
    </div>
  );
}

export default App;

