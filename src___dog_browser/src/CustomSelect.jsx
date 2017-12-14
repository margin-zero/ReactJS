import React from 'react';

export default class CustomSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: 'affenpinscher' };
    }

    scomponentWillMount() {
        this.setState({ value: this.props.mainBreeds[0]});
    }

    change(event) {
        this.setState({value: event.target.value});
    }   

    render(){

        var options = [];

        for (let i = 0; i < this.props.mainBreeds.length; i++) {
            options.push(<option key={i} value={this.props.mainBreeds[i]}>{this.props.mainBreeds[i]}</option>)
        }

        return(
           <div>
               <select id="lang" onChange={this.change.bind(this)} value={this.state.value}>
                {options}
               </select>
               <p></p>
               <p>{this.state.value}</p>
           </div>
        );
     }

}
