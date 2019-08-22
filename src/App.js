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
  margin-top: 15px;
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
      check: '',
      stepId: 0,
      history: []
  }

  getNewGame = (e) => {
    console.log('Nowa gra');
    const sudokuString = sudoku.generate(e.target.value);
    this.setState({
      initialBoard: sudokuString,
      board: sudokuString,
      history: [sudokuString],
      stepId: 0,
      check: ''
    });
  }

  changeBoard = (number, id) => {
    if(number === '') {
      number = '.';
    } 
    const newBoard = this.state.board.split('');
    newBoard[id] = number;
    const steps = this.state.history.slice(0,this.state.stepId+1);
    steps.push(newBoard.join(''));
    this.setState({ 
      board: newBoard.join(''),
      history: steps,
      stepId: this.state.stepId + 1
    });
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
      check: '',
      history: [this.state.initialBoard],
      stepId: 0
    })
  }

  undo = () => {
    const currentId = this.state.stepId;

    if(currentId > 0) {
      this.setState({
        board: this.state.history[currentId -1],
        stepId: currentId -1
      })
    }
  }

  redo = () => {
    const currentId = this.state.stepId +1;

    if(currentId < this.state.history.length) {
      let currentId = this.state.stepId +1
      this.setState({
        board: this.state.history[currentId],
        stepId: currentId
      })
    }
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
      {this.state.initialBoard !== '' &&
      <Buttons>
        <Btn onClick = { this.checkSolution } >Check</Btn>
        <Btn onClick = { this.getSolve }>Solve</Btn>
        <Btn onClick = { this.restart }>Restart</Btn> 
      </Buttons>
      }
      <Buttons>
        <h2>Wybierz poziom trudności gry:</h2>
        <Btn onClick = { this.getNewGame } value="easy">Łatwy</Btn>
        <Btn onClick = { this.getNewGame } value="medium">Średni</Btn>
        <Btn onClick = { this.getNewGame } value="hard">Trudny</Btn>
      </Buttons>
      <Buttons>
        <Btn onClick = { this.undo }>Cofnij</Btn>
        <Btn onClick = { this.redo }>Powtórz</Btn>
      </Buttons>
    </Main>
    );
  }
}

export default App;
