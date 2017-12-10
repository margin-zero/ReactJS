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
        //var chartHeaderText = this.state.chartHeaderText;
        //var chartDataValues = this.state.chartDataValues;

        // init values for chart
        // chartHeaderText = this.props.chartheadertext;
        //chartDataValues = [29,45,33,10];

        // set new state
        this.setState(
            { 
                chartHeaderText: this.props.chartheadertext,
                chartDataValues: JSON.parse(this.props.chartdatavalues).values
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

