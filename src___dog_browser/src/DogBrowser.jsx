import React from 'react';
import './index.css';

const API = 'https://dog.ceo/api/breeds/list/all';


export default class DogBrowser extends React.Component {

    constructor() {
        super();
        this.state = {
            mainBreeds: [],
            allBreeds: []
        };
    }

    componentWillMount() {

        fetch(API)
        .then(response => response.json())
        .then(data => this.setState({ 
            mainBreeds: Object.keys(data.message),
            allBreeds: Object.entries(data.message)
         }));

        //alert(this.state.breeds[0].key + " == " + this.state.breeds[0].value);
    }

    render() { 

        var mb = "";

        for (let i = 0; i < this.state.mainBreeds.length; i++) {

            let ab = this.state.allBreeds;
            
            mb = mb + ab[i][0];

            if (ab[i][1].length > 0) { 
                mb = mb + ": " + ab[i][1] + "... <br> "
            } else
            { mb = mb + " (tylko main)... <br>"};


     
        }

        return (
            <div>
                <p>This is Dog Browser application</p>
                <p>
                {mb}
                </p>
            </div>
        )
    }
}
