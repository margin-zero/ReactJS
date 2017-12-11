import React from 'react';
import './index.css';
import './manifest.json';

import ChartBody from './ChartBody';

export default class BlockChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartHeaderText: '',
            chartDataValues: []
        };
    };

    componentDidMount() {
        this.initChart();
    }

    initChart() {
        this.setState({ 
            chartHeaderText: this.props.chartheadertext,
            chartDataValues: JSON.parse(this.props.chartdatavalues).values,
            chartDataLabels: JSON.parse(this.props.chartdatalabels).labels
        });
    }

    render() { 
        return (
            <ChartBody
                chartDataValues = {this.state.chartDataValues}
                chartHeaderText = {this.state.chartHeaderText}
                chartDataLabels = {this.state.chartDataLabels}
            />
        )
    }
}
