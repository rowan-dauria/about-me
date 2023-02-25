import { useState } from 'react';

function Square({ value, onSquareClick, key }) {

    return (
        <button
            id={key}
            className="square"
            onClick = {onSquareClick}
        >
            {value}
        </button>);
}

export default function Board() {
    const [ xIsNext, setXIsNext ] = useState(true);
    const [ squares, setSquares ] = useState(Array(9).fill(null));
    function handleClick(i) {
        const squaresClone = squares.slice();
        squaresClone[i] = xIsNext ? 'X' : 'O';
        setSquares(squaresClone);
        setXIsNext(!xIsNext);
    }
    return (
        <>
            <div className="board">
                {
                    squares.map((val, index) => {
                        return (<Square key={index} value={val} onSquareClick={() => handleClick(index)}/>)
                    })
                }
            </div>
        </>
    );
}