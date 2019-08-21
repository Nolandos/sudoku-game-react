import React from 'react';
import './App.css';
import sudoku from 'sudoku-umd';
import styled from 'styled-components';

//Import Components
import Board from './components/Board/Board';

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {  
  state = {
      initialBoard: '',
      board: '',
      check: ''
  }

  getNewGame = () => {
    console.log('Nowa gra');
    const sudokuString = sudoku.generate("easy");
    this.setState({
      initialBoard: sudokuString,
      board: sudokuString,
      check: ''
    });
  }

  changeBoard = (number, id) => {
    if(number === '') {
      number = '.';
    } 
    const newBoard = this.state.board.split('');
    newBoard[id] = number;
    this.setState({ board: newBoard.join('') });
  }

  checkSolution = () => {
    console.log('Uwaga Sprawdzamy');
    if(sudoku.solve(this.state.initialBoard) === this.state.board) {
      console.log('Rozwiązałeś Brawo !');
      this.setState({check: 'resolved'});
    } else {
      this.setState({check: 'unresolved'});
      console.log('No niestety, nie udało się :/');
    };
  }

  getSolve = () => {
    this.setState({
      board: sudoku.solve(this.state.initialBoard)
    })
  }
  
  restart = () => {
    this.setState({
      board: this.state.initialBoard,
      check: ''
    })
  }

  render () {
    return (
      <Main className="App">
      <div>
        <h1>Sudoku</h1>
        <Board board = { this.state.board } initialBoard = { this.state.initialBoard } onChange = {this.changeBoard} />
      </div>
      <div className="buttons">
        <button onClick = { this.checkSolution } >Check</button>
        <button onClick = { this.getNewGame }>New Game</button>
        <button onClick = { this.getSolve }>Solve</button>
        <button onClick = { this.restart }>Restart</button>
        {this.state.check === 'resolved' && <div>Brawo Udało ci się !</div> } 
        {this.state.check === 'unresolved' && <div>Ups, coś poszło nie tak :/</div>}
      </div>
    </Main>
    );
  }
}

export default App;
