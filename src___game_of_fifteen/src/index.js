import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                squares: this.scramble([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null]),
                solved: false
            };
        };

        // scramble() "miesza" planszę przez symulowanie losowych przesunięć klocków.
        // Dzięki temu unikamy sytuacji, w której planszy nie da się ułożyć

        scramble(squares) {
            const neighbours = getNeighbourArray(); // odczytujemy tablicę sąsiedztw
            var i = 15; // pozycja pustego miejsca na ułożonej planszy

            for (let j = 1; j <= 200; j++ ) {
                let neighbourCount = neighbours[i].length; // ustalamy ilość sąsiadów "pustego" miejsca
                let moveFrom = neighbours[i][getRandomInt(0,neighbourCount-1)]; // ustalamy który klocek przesuniemy
                
                squares[i] = squares[moveFrom]; // w "puste" miejsce przesuwamy ustalony klocek
                squares[moveFrom] = null; // w miejscu przesuniętego klocka wstawiamy "null" - tu będzie teraz "puste" miejsce
                i = moveFrom; // nowa pozycja pustego miejsca na planszy
            }

            return squares;
        }
        
        handleClick(i) {
            const newSquares = this.state.squares.slice();
            let moveTo = this.canMove(i); // null === nie można przesunąć, !null === numer pola, na które można przesunąć

            // jeśli można przesunąć (moveTo != null) i jeszcze nie jest ułożone (!this.state.solved)
            if ((moveTo != null)  && !this.state.solved) {
                newSquares[moveTo] = newSquares[i];
                newSquares[i] = null;
                this.setState({ squares: newSquares });

                if (this.isSolved(newSquares)) { this.setState({solved: true});}
            }
        }

        canMove(pieceNumber) {
            const neighbours = getNeighbourArray();
            let current = neighbours[pieceNumber];
            let canMove = false;
            let moveTo = pieceNumber;

            for (let j = 0; j < current.length; j++) {
                if (!this.state.squares[current[j]]) {
                    canMove = true;
                    moveTo = current[j];
                }
            }

            if (canMove) { return moveTo;} else { return null;}
        }

        isSolved(squares) {
            let solvedPieces = 0;
            for (let i = 0; i<=14; i++ ) {
                if (squares[i] === i+1) { solvedPieces++;}
            }

            if (solvedPieces === 15) { return true; } else { return false;}
        }


        startNewGame() {
           
            this.setState({ 
                squares: this.scramble([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null]),
                solved: false 
            });

            return null;
        }

        render() { 
            const squares = this.state.squares;
            var status = "";
            var newGame = null;
            
            if (this.state.solved) { 
                status = "Solved! Congratulations!";
                newGame = <button onClick={() => this.startNewGame()} className="button-new">new game</button>;
                }
            return (
                <div className="game-table">
                    <h1 className="game-name">Game of Fifteen</h1>
                    <Board 
                    squares={squares} 
                    onClick={(i) => this.handleClick(i)}
                    canMove={(i) => this.canMove(i)}
                    />
                    <p className="status-text">{status}</p>
                    {newGame}
                </div>
            )
        }
    }

class Board extends React.Component {

    render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
            </div>
            <div className="board-row">
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
            </div>
            <div className="board-row">
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
              {this.renderSquare(11)}
            </div>
            <div className="board-row">
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
            </div>
          </div>
        );
    } 

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                canMove={this.props.canMove(i)}
            />
        )
    }
}

function Square(props) {
    let clName = "";
    if (props.canMove != null ) { clName = "board-square move"; } else { clName = "board-square"}
    return (
       <div className={clName}  onClick={props.onClick}>
        {props.value}
        </div>
    );
  }

function getNeighbourArray() {
    return [
        [1,4],
        [0,2,5],
        [1,3,6],
        [2,7],
        [0,5,8],
        [1,4,6,9],
        [2,5,7,10],
        [3,6,11],
        [4,9,12],
        [5,8,10,13],
        [6,9,11,14],
        [7,10,15],
        [8,13],
        [9,12,14],
        [10,13,15],
        [11,14]
    ];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =====================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

// ====================================