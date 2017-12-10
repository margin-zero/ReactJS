import React from 'react';
import './index.css';
import { CHART_COLORS } from './ChartColors';

export default class ChartBody extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // {this.props.chartDataValues}
        };
    };

    render() {
        var blockCount = this.props.chartDataValues.length,
            blockLength =  (100-(blockCount+1)) / blockCount,
            leadingSpace = 100-((blockLength+1) * blockCount),
            minValue = Math.min( ...this.props.chartDataValues ),
            maxValue = Math.max( ...this.props.chartDataValues ),
            heightRatio = (201 / (maxValue - minValue + 1)),
            zeroLevel = Math.floor(maxValue * heightRatio);

            if (maxValue >= 0 && minValue >= 0 ) {
                heightRatio = (201 / maxValue);
                zeroLevel = 201;
            }

            if (maxValue <=0 && minValue <= 0) {
                heightRatio = (201 / (minValue * -1));
                zeroLevel = 0;
            }

        var blocks = [];

        for (var i = 0; i < blockCount; i++ ) {
            let rectY = 0;

            if (this.props.chartDataValues[i] > 0 ) {
                rectY = zeroLevel - Math.floor(this.props.chartDataValues[i]*heightRatio);
            }
            if (this.props.chartDataValues[i] < 0 ) {
                rectY = zeroLevel;
            }

            blocks.push(
                <rect x={(leadingSpace + ( i * (blockLength + 1))) + "%"} y={rectY} width={blockLength + "%"} height = { Math.abs(Math.floor(this.props.chartDataValues[i]*heightRatio))} style={{ fill: CHART_COLORS[i % 35] }} />
            )
        }

        var chartBody = 
        <svg className="block-chart" style={{width: "100%", height: "201px"}}>
            <line x1="0" y1={zeroLevel} x2="100%" y2={zeroLevel} style={{stroke: "rgba(0,0,0,0.3)", strokeWidth: "1px" }} />
                {blocks}
        </svg>;

        return (
            <div>
            { chartBody }
            </div>

        )
    }
}