import React from 'react';
import './index.css';

export default class ChartHeader extends React.Component {
    
    render() {
        return(
            <h5>{this.props.chartHeaderText}</h5>
        )
    }
}