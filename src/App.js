import React from 'react';
import './App.css';
import sudoku from 'sudoku-umd';
import styled from 'styled-components';

//Import Components
import Board from './components/Board/Board';

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  margin-top: 25px;
`;

const Btn = styled.button`
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Kaushan Script', cursive;
  margin: 0 5px;
  padding: 10px 35px;
  border: 4px solid #041C5E;
  border-radius: 5px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  &.hard {
    background-color: #D70000;
    :hover {
      background-color: #F34E4E;
    }
  }
  &.medium {
    background-color: #D7A500;
    :hover {
      background-color: #F3CD4E;
    }
  }
  &.easy {
    background-color: #11B000;
    :hover {
      background-color: #89E380;
    }
  }
`;

const CheckInfo = styled.div`
  margin-top: 25px;
  font-size: 1.5em;
`;

const Wrapper = styled.div`
  margin-top: 5%;
  margin-left: 5%;
`;

const Title = styled.h1 `
  font-size: 3.5em;
  margin: 15px 0;
  color: #102C4B;
`;

class App extends React.Component {  
  state = {
      initialBoard: '236958147847316295591724386163579824782431569459682731374865912915243678628197453',
      board: '236958147847316295591724386163579824782431569459682731374865912915243678628197453',
      check: '',
      stepId: 0,
      history: [],
      start: false
  }

  getNewGame = (e) => {
    console.log('Nowa gra');
    const sudokuString = sudoku.generate(e.target.value);
    this.setState({
      initialBoard: sudokuString,
      board: sudokuString,
      history: [sudokuString],
      stepId: 0,
      check: '',
      start: true
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
    const { check, initialBoard, board, start } = this.state;

    return (
      <Main className="App">
      <div>
        <Title>Sudoku</Title>
        <Board board = { board } initialBoard = { initialBoard } onChange = {this.changeBoard} />
      </div>
      <Wrapper>
        <h2>Wybierz poziom trudności gry:</h2>
        <Buttons>
          <Btn className="easy" onClick = { this.getNewGame } value="easy">Łatwy</Btn>
          <Btn className="medium" onClick = { this.getNewGame } value="medium">Średni</Btn>
          <Btn className="hard" onClick = { this.getNewGame } value="hard">Trudny</Btn>
        </Buttons>
        { start &&
          <div>
          <h2>Opcje tablicy:</h2>
          <Buttons>
            <Btn onClick = { this.checkSolution }>Sprawdź</Btn>
            <Btn onClick = { this.getSolve }>Rozwiązanie</Btn>
            <Btn onClick = { this.restart }>Od nowa</Btn> 
          </Buttons>
          <Buttons>
            <Btn onClick = { this.undo }>Cofnij</Btn>
            <Btn onClick = { this.redo }>Powtórz</Btn>
          </Buttons>
          </div>
        }
        { check === 'resolved' && <CheckInfo>Brawo Udało ci się !</CheckInfo> } 
        { check === 'unresolved' && <CheckInfo>Ups, coś poszło nie tak :/</CheckInfo> }
      </Wrapper>
    </Main>
    );
  }
}

export default App;
