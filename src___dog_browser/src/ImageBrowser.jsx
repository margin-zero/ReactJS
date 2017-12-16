import React from 'react';

export default class ImageBrowser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0
        }

        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);

    }

    previousImage() {
        var newCurrent = (this.state.currentImage-1) % this.props.images.length;
        if (newCurrent < 0) { newCurrent = this.props.images.length - 1};
        this.setState({currentImage: newCurrent});
    }

    nextImage() {
        var newCurrent = (this.state.currentImage+1) % this.props.images.length;
        if (newCurrent > (this.props.images.length - 1)) { newCurrent = 0};
        this.setState({currentImage: newCurrent});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.images !== nextProps.images) {
            this.setState({currentImage: 0});    
        }
        
    }

    render () {

        return(
            <div className="image-browser-container">
            
                <div className="image-nav">
                    <button className="nav-button left" onClick={this.previousImage}>previous</button>
                    <p>{this.props.breedName.toUpperCase()} - image {this.state.currentImage+1} of {this.props.images.length}</p>
                    <button className="nav-button right" onClick={this.nextImage}>next</button>
                </div>

                <img src={this.props.images[this.state.currentImage]} alt="dog"/>
                
            </div>
        )
    }
}