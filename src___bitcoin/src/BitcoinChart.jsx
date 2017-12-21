import React from 'react';


export default class BitcoinChart extends React.Component {

    getChart() {
        var chartObject,
            chartCurrency = this.props.currency,
            chartData = this.props.dataArray.map(function(x) {
                if (x) { return x.bpi[chartCurrency].rate_float; }
                return 0;
            }),
            lines = [],
            maxValue = chartData[chartData.length-1],
            minValue = chartData[chartData.length-1],
            unitValue,
            coords = {};

        for (let i = 0; i < this.props.dataArray.length; i ++) {
            if (chartData[i] > 0) {
                if (chartData[i] < minValue) { minValue = chartData[i] };
                if (chartData[i] > maxValue) { maxValue = chartData[i] };
            }
        }

        //if (minValue === 0) {
        //    minValue = maxValue;
        //}

        if (minValue === maxValue) {
            minValue = minValue - 100;
            maxValue = maxValue + 100;
        }

        unitValue = 201 / (maxValue - minValue);


        for (let i = 1; i < this.props.dataArray.length; i++) {
            
                coords.x1 = (i-1) * 20;
                coords.x2 = i * 20;

            if (chartData[i-1] > 0) {
                coords.y1 = ((maxValue - chartData[i-1]) * unitValue).toString();
            } else {
                coords.y1 = 201;
            }

            if (chartData[i] > 0) {
                coords.y2 = ((maxValue - chartData[i]) * unitValue).toString();
            } else {
                coords.y2 = 201;
            }
                lines.push(
                    <line key={i} className="bitcoin-chart-line" {...coords} />
                )
            
        }
        
        chartObject = 
            <div>
            <p>minValue: {minValue} - maxValue: {maxValue} --- unitValue: {unitValue}</p>
            <svg className="bitcoin-chart">
                {lines}
            </svg>
            </div>;

        return  chartObject;

    }


    render() {
        return (
            <section>
                <h1>Bitcoin Chart!</h1>
                <p>chart for {this.props.currency} :</p>
                
                {this.getChart()}

            </section>
        )
    }
}