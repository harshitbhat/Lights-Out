import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.2,
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nRows; i++) {
      const row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    const nrows = this.props.nRows;
    const ncols = this.props.nCols;
    let board = this.state.board;
    let [i, j] = coord.split('-').map(Number);
    function flipCell(i, j) {
      // if this coord is actually on board, flip it
      if (i >= 0 && i < nrows && j >= 0 && j < ncols) {
        board[i][j] = !board[i][j];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(i, j);
    flipCell(i, j + 1);
    flipCell(i, j - 1);
    flipCell(i + 1, j);
    flipCell(i - 1, j);
    // win when every cell is turned off
    // TODO: determine is the game has been won

    let hasWon = board.every((row) => row.every((cell) => cell === false));

    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!!!</span>
          </div>
        </div>
      );
    }
    let tableBoard = [];
    for (let i = 0; i < this.props.nRows; i++) {
      let row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        const coord = `${i}-${j}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[i][j]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tableBoard.push(<tr key={i}>{row}</tr>);
    }
    // TODO
    // make table board
    // TODO
    return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
