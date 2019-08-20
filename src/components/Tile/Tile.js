import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid #000;
    width: 50px;
    height: 50px;
    text-align: center;
`;

class Tile extends React.Component {
    state = {
        number: this.props.number
    }
    
    handleChange = async (e) => {
        await this.setState({ number: e.target.value});
        this.props.onChange(this.state.number, this.props.id);
    }

    render () {
        const { number } = this.props;
        return (
            <Input
                type = "number"
                min = "1"
                max = "9"
                defaultValue = { number === '.' ? '' : number }
                disabled = { isNaN(number) ? false : true }
                onChange = { this.handleChange }             
            ></Input>
        );
    }
}
     

export default Tile;