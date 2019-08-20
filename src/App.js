import React from 'react';
import './App.css';
import sudoku from 'sudoku-umd';
import styled from 'styled-components';

//Import Components
import Board from './components/Board/Board';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class App extends React.Component {  
  state = {
      initialBoard: '',
      board: '',
  }

  getNewGame = async() => {
    console.log('Nowa gra');
    const number = sudoku.generate("easy");
    await this.setState({
      initialBoard: number,
      board: number
    });
  
  }

  handleC = (number, id) => {
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
    } else {
      console.log('No niestety, nie udało się :/');
    };
  }

  getSolve = () => {
    console.log(sudoku.solve(this.state.initialBoard));
  }
  
  restart = () => {
    console.log(this.state.board);
  }

  render () {
    return (
      <Main className="App">
      <h1>Sudoku</h1>
      <Board board = { this.state } onChange = {this.handleC} />
      <div className="buttons">
        <button onClick = { this.checkSolution } >Check</button>
        <button onClick = { this.getNewGame }>New Game</button>
        <button onClick = { this.getSolve }>Solve</button>
        <button onClick = { this.restart }>Restart</button>
      </div>
    </Main>
    );
  }
}

export default App;
