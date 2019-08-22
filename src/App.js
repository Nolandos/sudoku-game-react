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
      initialBoard: '236958147847316295591724386163579824782431569459682731374865912915243678628197453',
      board: '236958147847316295591724386163579824782431569459682731374865912915243678628197453',
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
    const { initialBoard } = this.state;

    this.setState({
      board: sudoku.solve(initialBoard)
    })
  }
  
  restart = () => {
    const { initialBoard } = this.state;
    this.setState({
      board: initialBoard,
      check: '',
      history: [initialBoard],
      stepId: 0
    })
  }

  undo = () => {
    const { stepId, history } = this.state;
    const currentId = stepId;

    if(currentId > 0) {
      this.setState({
        board: history[currentId -1],
        stepId: currentId -1
      })
    }
  }

  redo = () => {
    const { stepId, history } = this.state;
    const currentId = stepId +1;

    if(currentId < history.length) {
      let currentId = stepId +1
      this.setState({
        board: history[currentId],
        stepId: currentId
      })
    }
  }

  render () {
    const { check, initialBoard, board, } = this.state;

    return (
      <Main className="App">
      <div>
        <h1>Sudoku</h1>
        <Board board = { board } initialBoard = { initialBoard } onChange = {this.changeBoard} />
      </div>
      { check === 'resolved' && <CheckInfo>Brawo Udało ci się !</CheckInfo> } 
      { check === 'unresolved' && <CheckInfo>Ups, coś poszło nie tak :/</CheckInfo> }
      { initialBoard !== '' &&
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
