import React from 'react';

export default class MainBreedSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: this.props.selectedBreed
         };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onMainBreedChange(event.target.value);
    }


    render(){

        var options = [];

        for (let i = 0; i < this.props.mainBreeds.length; i++) {
            options.push(<option key={i} value={this.props.mainBreeds[i]}>{this.props.mainBreeds[i].toUpperCase()}</option>)
        }

        return(

            <label>
            Pick dog breed:&nbsp;
            <select value={this.props.selectedBreed} onChange={this.handleChange}>
                {options}
            </select>
            </label>

        );
     }

}
