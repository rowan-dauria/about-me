import { useState } from 'react';
import './App.css';
import Board from './noughts-and-crosses';

function MyButton() {
  const [ clicked, setClicked ] = useState(false);
  function onClick(e) {
    if (!clicked) return;
    e.stopPropagation();
    setClicked(true);
  }
  return (
    <button onClick={onClick}>Let's play!</button>
  );
}

function App() {
  return (
    <div className="App">
      <h1> Let's play Noughts and Crosses</h1>
      <MyButton />
      <Board />
    </div>
  );
}

export default App;

