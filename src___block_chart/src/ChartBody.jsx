import React from 'react';
import './index.css';
import { CHART_COLORS } from './ChartColors';

export default class ChartBody extends React.Component {
    
    render() {
        var blockCount = this.props.chartDataValues.length,
            blockLength =  (100-(blockCount+1)) / blockCount,
            leadingSpace = 100-((blockLength+1) * blockCount),
            minValue = Math.min( ...this.props.chartDataValues ),
            maxValue = Math.max( ...this.props.chartDataValues ),
            heightRatio = (201 / (maxValue - minValue + 1)),
            zeroLevel = parseInt(Math.floor(maxValue * heightRatio), 10),

            chartHeader,
            chartBody,
            chartLegend = [],

            blocks = [];

            if (maxValue >= 0 && minValue >= 0 ) {
                heightRatio = (201 / maxValue);
                zeroLevel = 201;
            }

            if (maxValue <=0 && minValue <= 0) {
                heightRatio = (201 / (minValue * -1));
                zeroLevel = 0;
            }


        for (let i = 0; i < blockCount; i++ ) {
            let rectY = 0;

            if (this.props.chartDataValues[i] > 0 ) {
                rectY = zeroLevel - Math.floor(this.props.chartDataValues[i]*heightRatio);
            }
            if (this.props.chartDataValues[i] < 0 ) {
                rectY = zeroLevel;
            }

            blocks.push(
                <rect key={i} x={(leadingSpace + ( i * (blockLength + 1))) + "%"} y={rectY} width={blockLength + "%"} height = { Math.abs(Math.floor(this.props.chartDataValues[i]*heightRatio))} style={{ fill: CHART_COLORS[i % CHART_COLORS.length] }} />
            )

            chartLegend.push(
                <div key={i} className="legend-element">
                    <div className="legend-element-color" style={{background: CHART_COLORS[i % CHART_COLORS.length] }}></div>
                    <p className="legend-element-text">{this.props.chartDataLabels[i] + ": ( " + this.props.chartDataValues[i] +" )"}</p>
                </div>
            )
        }


        chartHeader = <h1 className="block-chart-header">{this.props.chartHeaderText}</h1>;
        chartBody = <div className="block-chart-body-container">
                        <svg className="block-chart">
                            <line x1="0" y1={zeroLevel.toString()} x2="100%" y2={zeroLevel.toString()} style={{stroke: "rgba(0,0,0,0.3)", strokeWidth: "1px" }} />
                            {blocks}
                        </svg>
                    </div>
                    

// <line x1="0" y1={zeroLevel} x2="100%" y2={zeroLevel} style={{stroke: "rgba(0,0,0,0.3)", strokeWidth: "1px" }} />


        return (
            <div>
            { chartHeader }
            { chartBody }
            { chartLegend }
            </div>

        )
    }
}
