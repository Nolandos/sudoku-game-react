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

const Buttons = styled.div`
  margin-top: 25px;
`;

const Btn = styled.button`
  margin: 0 5px;
  padding: 5px 25px;
`;

const CheckInfo = styled.div`
  margin-top: 25px;
  font-size: 1.5em;
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
      {this.state.check === 'resolved' && <CheckInfo>Brawo Udało ci się !</CheckInfo> } 
      {this.state.check === 'unresolved' && <CheckInfo>Ups, coś poszło nie tak :/</CheckInfo>}
      <Buttons>
        <Btn onClick = { this.checkSolution } >Check</Btn>
        <Btn onClick = { this.getNewGame }>New Game</Btn>
        <Btn onClick = { this.getSolve }>Solve</Btn>
        <Btn onClick = { this.restart }>Restart</Btn>
      </Buttons>
    </Main>
    );
  }
}

export default App;
