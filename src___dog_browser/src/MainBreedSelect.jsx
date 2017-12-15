import React from 'react';

export default class MainBreedSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: this.props.selectedBreed
         };

        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onMainBreedChange(event.target.value);
    }

    //handleSubmit(event) {
    //    alert('You selected: ' + this.state.value);
    //    event.preventDefault();
    //}


    render(){

        var options = [];

        //var selectedBreed = this.props.selectedBreed;


        for (let i = 0; i < this.props.mainBreeds.length; i++) {
            options.push(<option key={i} value={this.props.mainBreeds[i]}>{this.props.mainBreeds[i].toUpperCase()}</option>)
        }

        return(

            <label>
            Pick dog breed:
            <select value={this.props.selectedBreed} onChange={this.handleChange}>
                {options}
            </select>
            </label>

        );
     }

}
