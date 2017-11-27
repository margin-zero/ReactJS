import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                squares: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null],
                solved: false
            };
            this.scramble();
        }
    
        scramble() {
            var i;
            for (i=0;i<100;i++) {
                let sq1 = getRandomInt(0,15);
                let sq2 = getRandomInt(0,15);

                let tmp = this.state.squares[sq1];
                this.state.squares[sq1] = this.state.squares[sq2];
                this.state.squares[sq2] = tmp;
            }
        }

        handleClick(i) {
            const newSquares = this.state.squares.slice();
            const neighbours = [
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
            
            let current = neighbours[i];
            let canMove = false;
            let moveTo = i;

            for (let j = 0; j < current.length; j++) {
                if (!this.state.squares[current[j]]) { 
                    canMove = true;
                    moveTo = current[j];
                }
            }

            if (canMove && !this.state.solved) {
                newSquares[moveTo] = newSquares[i];
                newSquares[i] = null;
                this.setState({ squares: newSquares });

                let solvedPieces = 0;

                for (let j = 0; j <= 14; j++) {
                    if (newSquares[j] === j+1) { solvedPieces++; }
                }

                if (solvedPieces === 15) { this.setState({solved : true});}
            }
        }

        render() { 
            const squares = this.state.squares;

            return (
                <Board 
                squares={squares} 
                onClick={(i) => this.handleClick(i)}
                />
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
            />
        )
    }
}






function Square(props) {
    return (
       <div className="board-square"  onClick={props.onClick}>
        {props.value}
        </div>
    );
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