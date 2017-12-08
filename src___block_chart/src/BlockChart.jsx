import React from 'react';
import './index.css';
import './manifest.json';

import ChartBody from './ChartBody';
import ChartHeader from './ChartHeader';

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
        var chartHeaderText = this.state.chartHeaderText;
        var chartDataValues = this.state.chartDataValues;

        // init values for chart
        chartHeaderText = 'default text for header';
        chartDataValues = [29,45,33,10];

        // set new state
        this.setState(
            { 
                chartHeaderText: chartHeaderText,
                chartDataValues: chartDataValues 
            }
        );
    }

    render() { 
        return (
            <div>
                <ChartHeader 
                    chartHeaderText = {this.state.chartHeaderText}
                />
                <ChartBody
                    chartDataValues = {this.state.chartDataValues} />
            </div>
        )
    }
}

