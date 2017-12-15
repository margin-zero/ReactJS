import React from 'react';

export default class SubBreedSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: this.props.selectedSubBreed
         };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onSubBreedChange(event.target.value);
    }


    render(){

        var options = [];

        if (this.props.subBreeds.length > 1) {
            options = [<option key={-1} value={''}>(all sub-breeds)</option> ];
        }

        for (let i = 0; i < this.props.subBreeds.length; i++) {
            options.push(<option key={i} value={this.props.subBreeds[i]}>{this.props.subBreeds[i].toUpperCase()}</option>)
        }

        return(

            <label>
            Pick dog sub-breed:
            <select value={this.props.selectedSubBreed} onChange={this.handleChange}>
                {options}
            </select>
            </label>

        );
     }

}
