import { useState } from 'react';
import ConfettiOverlay from './confetti';

function Square({ value, onSquareClick, id }) {

    return (
        <button
            id={id}
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>);
}

export function Board({ squares, handleClick }) {
    return (
        <>
            <div className="board">
                {
                    squares.map((val, index) => {
                        return (<Square id={index} key={index} value={val} onSquareClick={() => handleClick(index)} />)
                    })
                }
            </div>
        </>
    );
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [record, setRecord] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const squares = record[currentMove];

    const moves = record.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move} >
            <button onClick={() => jumpToMove(move)}>{description}</button>
          </li>
        );
    });

    function jumpToMove(move) {
        setCurrentMove(move);
        setXIsNext(move % 2 === 0);
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;

        const squaresClone = squares.slice();
        squaresClone[i] = xIsNext ? 'X' : 'O';
        setXIsNext(!xIsNext);

        const newRecord = [...record.slice(0, currentMove + 1), squaresClone];
        setRecord(newRecord);
        setCurrentMove(newRecord.length - 1);
    }

    return (

        <div className="game">
            {calculateWinner(squares) ? <ConfettiOverlay /> : null}
            <div className="game-board">
                <Board
                    squares={squares}
                    xIsNext={xIsNext}
                    handleClick={handleClick}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (!squares) {
            console.log(squares);
        }
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}