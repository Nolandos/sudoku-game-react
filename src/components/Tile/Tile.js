import React from 'react';
import styled from 'styled-components';
import './Tile.scss';
import boarded from './board';

const Input = styled.input`
    border: 1px solid #000;
    margin-top: -1px;
    margin-right: -1px;
    margin-left: -1px;
    margin-top: -2px;
    width: 50px;
    height: 50px;
    text-align: center;
`;

class Tile extends React.Component { 
    handleChange = (e) => {
        if (e.target.value <= 9) {
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
       boarded.forEach((item, index) => {
           if(item.row === boarded[this.props.id].row || item.column === boarded[this.props.id].column) {  
            inputs[index].classList.add('active');
           }
       })
          
    }

    removeActive = () => {
        const inputs = document.querySelectorAll('.tile');
        inputs.forEach(item => {
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