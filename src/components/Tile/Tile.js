import React from 'react';
import styled from 'styled-components';
import './Tile.scss';
import boardBase from './board';

const Input = styled.input`
    border: 1px solid #000;
    margin-top: -1px;
    margin-right: -1px;
    margin-left: -1px;
    margin-top: -2px;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 1.2em;
    font-family: 'Kaushan Script', cursive;
`;

class Tile extends React.Component { 
    handleChange = (e) => {
        if (e.target.value <= 9 && e.target.value >0) {
            this.props.onChange(e.target.value, this.props.id);
        }   
    }

    checkKey = (e) => {
        if(e.key === '-' || e.key === 'e' || e.key === '+') {
            e.preventDefault();
        }
    }

    checkPlace = (e) => {
        const inputs = document.querySelectorAll('.tile');
        const { id } = this.props;

        boardBase.forEach((item, index) => {
            if(item.row === boardBase[id].row || item.column === boardBase[id].column) {  
                inputs[index].classList.add('active');
            }
            if(item.row === boardBase[id].row && item.column === boardBase[id].column) {  
                inputs[index].classList.add('main-active');
            }
        })      
    }

    removeActive = () => {
        const inputs = document.querySelectorAll('.tile');
        inputs.forEach(item => {
            item.classList.remove('main-active');
            item.classList.remove('active');
        });  
    }

    render () {
        const { number, initialNumber } = this.props;
        return (
            <Input
                className= "tile"
                type = "number"
                min = "1"
                max = "9"
                value = { number === '.' ? '' : number }
                disabled = { isNaN(initialNumber) ? false : true }
                onChange = { this.handleChange } 
                onKeyDown = { this.checkKey } 
                onFocus = { this.checkPlace }
                onBlur = { this.removeActive }           
            ></Input>
        );
    }
}
     

export default Tile;