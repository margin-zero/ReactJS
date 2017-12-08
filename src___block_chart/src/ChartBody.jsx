import React from 'react';
import './index.css';

export default class ChartBody extends React.Component {
    render() {
        return (
            <div>
                {this.props.chartDataValues}
            </div>
        )
    }
}