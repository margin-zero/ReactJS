import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {
                squares: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null]
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

        render() { 
            const squares = this.state.squares;

            return (
                <Board squares={squares} />
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
            />
        )
    }
}






function Square(props) {
    return (
       <div className="board-square">{props.value}</div>
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