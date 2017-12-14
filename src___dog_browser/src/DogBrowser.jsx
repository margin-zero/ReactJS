import React from 'react';
import './index.css';

import CustomSelect from './CustomSelect';


const API = 'https://dog.ceo/api/breeds/list/all';

export default class DogBrowser extends React.Component {
    
    id = 'dupa jasio ID';

    constructor(props) {
        super(props);
        this.state = {
            allBreeds: [],
            mainBreeds: [],
            selectedBreed: 'affenpinscher'
        };
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => this.initBreeds(data));
    }

    initBreeds(data) {

        var breedArray = Object.entries(data.message),
            newAllBreeds = [],
            newMainBreeds = [];

        for (let i = 0; i < breedArray.length; i++) {

            let mainBreed = breedArray[i][0];

            newMainBreeds.push(mainBreed);

            if (breedArray[i][1].length > 0) {
                for (let j = 0; j < breedArray[i][1].length; j++) {
                    newAllBreeds.push({mainBreed: mainBreed, subBreed: breedArray[i][1][j], displayBreed: breedArray[i][1][j] + ' ' + mainBreed})
                }
            } else {
                newAllBreeds.push({mainBreed: mainBreed, subBreed: null, displayBreed: mainBreed})
            }
        }

        this.setState({ 
            allBreeds: newAllBreeds, 
            mainBreeds: newMainBreeds,
            selectedBreed: newMainBreeds[0]
        });
    }


    render() { 

        return (
            <div>
            <p>This is Dog Browser application</p>

            <CustomSelect 
                allBreeds={this.state.allBreeds}
                mainBreeds={this.state.mainBreeds}
                selectedBreed={this.state.selectedBreed}
            />

            </div>
        )
    }
}
