import React from 'react';
import './index.css';

import MainBreedSelect from './MainBreedSelect';
import SubBreedSelect  from './SubBreedSelect';
import ImageBrowser    from './ImageBrowser';

const mainBreedsAPI = 'https://dog.ceo/api/breeds/list';

export default class DogBrowser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mainBreeds: [],
            subBreeds: [],
            selectedBreed: '',
            selectedSubBreed: '',
            imagesAPI: '',
            images: []
        };

        this.handleMainBreedChange = this.handleMainBreedChange.bind(this);
        this.handleSubBreedChange = this.handleSubBreedChange.bind(this);
    }

    componentDidMount() {
        fetch(mainBreedsAPI)
            .then(response => response.json())
            .then(data => this.initBreeds(data));
    }


    initBreeds(data) {

        var breedArray = Object.entries(data.message),
            newMainBreeds = [];

        if (data.status === 'success') {
            for (let i = 0; i < breedArray.length; i++) {
                let mainBreed = breedArray[i][1];
                newMainBreeds.push(mainBreed);
            }
        }

        this.setState({ 
            mainBreeds: newMainBreeds,
            selectedBreed: newMainBreeds[0],
        });

        this.handleMainBreedChange(newMainBreeds[0]);
    }


    initSubBreeds(data) {

        var subBreedsArray = Object.entries(data.message),
            newSelectedSubBreed = '',
            newSubBreeds = [];

        if (data.status === 'success') {
            for (let i = 0; i < subBreedsArray.length; i++) {
                newSubBreeds.push(subBreedsArray[i][1]);
            }
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

        // fetch sub-breeds of new selected mainBreed and init sub-breeds array
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

        this.setState({ imagesAPI: newAPI }, this.fetchImages);   
    }


    fetchImages() {

        fetch(this.state.imagesAPI)
            .then(response => response.json())
            .then(data => this.generateImagesArray(data));
    }

    generateImagesArray(data) {

        var imagesArray = Object.entries(data.message),
            newImages = [];
        
        if (data.status === 'success') {
            for (let i = 0; i < imagesArray.length; i++ ) {
                newImages.push(imagesArray[i][1]);
            }
        }

        this.setState({images: newImages});
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
            <div className="dog-browser-container">
                <h1 className="app-title">Dog Browser</h1>

                <div className="selectors-container">
                    <div>
                        <MainBreedSelect 
                            mainBreeds={this.state.mainBreeds}
                            selectedBreed={this.state.selectedBreed}
                            onMainBreedChange={this.handleMainBreedChange}
                        />
                    </div>

                    <div>
                        {subBreeds}
                    </div>
                </div>


                <ImageBrowser 
                    images={this.state.images}
                    breedName={this.state.selectedSubBreed + ' ' + this.state.selectedBreed}
                />

                <footer>powered by: <a href="https://dog.ceo/dog-api/">dog-API</a></footer>
            </div>
        )
    }
}
