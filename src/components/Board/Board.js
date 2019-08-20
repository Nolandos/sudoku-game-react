import React from 'react';
import Tile from '../Tile/Tile';
import styled from 'styled-components';

const NewBoard = styled.div`
    display: flex;
    justify-content: center;
    width: 480px;
    flex-wrap: wrap;
`;

const Board = ({ board, onChange }) => 
    <NewBoard>
        { board.initialBoard.split('').map((item, index) => <Tile onChange = {(number, id) => onChange(number, id) }  key = { index } id = { index } number={ item }/>) }
    </NewBoard>


export default Board;