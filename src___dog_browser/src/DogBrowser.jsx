import React from 'react';
import './index.css';

import MainBreedSelect from './MainBreedSelect';
import SubBreedSelect  from './SubBreedSelect';

const API = 'https://dog.ceo/api/breeds/list/all';

export default class DogBrowser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allBreeds: [],
            mainBreeds: [],
            subBreeds: [],
            selectedBreed: '',
            selectedSubBreed: '',
            imagesAPI: ''
        };

        this.handleMainBreedChange = this.handleMainBreedChange.bind(this);
        this.handleSubBreedChange = this.handleSubBreedChange.bind(this);
    }

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => this.initBreeds(data));
    }

    initBreeds(data) {

        // UWAGA!!! - zdecydować, czy tablica allBreeds (rasy i pod-rasy) będzie potrzebna.
        // jeśli nie, to można zmienić sposób generowania tablicy newMainBreeds na znacznie prostszy

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
            selectedBreed: newMainBreeds[0],
        });

        this.handleMainBreedChange(newMainBreeds[0]);
    }


    initSubBreeds(data) {

        var subBreedsArray = Object.entries(data.message),
            newSelectedSubBreed = '',
            newSubBreeds = [];
        
        for (let i = 0; i < subBreedsArray.length; i++) {
            newSubBreeds.push(subBreedsArray[i][1]);
        }

        if (newSubBreeds.length > 0) { 
            if (newSubBreeds.length === 1) { 
                newSelectedSubBreed = newSubBreeds[0] 
            } else {
                newSelectedSubBreed = ''
            }
        }

        this.setState({
            subBreeds: newSubBreeds,
            selectedSubBreed: newSelectedSubBreed
        }, this.generateAPI);

    }

    handleMainBreedChange(newValue) {
        this.setState({selectedBreed: newValue});

        fetch('https://dog.ceo/api/breed/' + newValue + '/list')
            .then(response => response.json())
            .then(data => this.initSubBreeds(data));
    }


    handleSubBreedChange(newValue) {
        this.setState({
            selectedSubBreed: newValue
        }, this.generateAPI);
    }

    generateAPI() {

        var newAPI= '';

        if (this.state.selectedSubBreed.length === 0) {
            newAPI = 'https://dog.ceo/api/breed/' + this.state.selectedBreed + '/images';
        } else {
            newAPI = 'https://dog.ceo/api/breed/' + this.state.selectedBreed + '/' + this.state.selectedSubBreed +'/images';
        }

        this.setState({ imagesAPI: newAPI });
        
    }


    render() { 

        var subBreeds = '';

        if (this.state.subBreeds.length > 0) {
            subBreeds = <SubBreedSelect 
                            subBreeds={this.state.subBreeds}
                            selectedSubBreed={this.state.selectedSubBreed}
                            onSubBreedChange={this.handleSubBreedChange}
                        /> 
        }
        
        return (
            <div>
            <p>This is Dog Browser application</p>
            <p>First breed={this.state.selectedBreed}</p>
            <p>First subBreed={this.state.selectedSubBreed}</p>

            <MainBreedSelect 
                mainBreeds={this.state.mainBreeds}
                selectedBreed={this.state.selectedBreed}
                onMainBreedChange={this.handleMainBreedChange}
            />

            {subBreeds}

            {this.state.subBreeds}
            <p>{this.state.selectedSubBreed}</p>
            <p>API: {this.state.imagesAPI}</p>
            </div>
        )
    }
}
