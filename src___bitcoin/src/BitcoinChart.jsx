import React from 'react';

export default class BitcoinChart extends React.Component {

    constructor(props) {
        super(props);
        this.toggleShowClick = this.toggleShowClick.bind(this);
    }

    getChart() {
        var chartObject,
            chartCurrency = this.props.currency,
            chartData = this.props.dataArray.map(function(x) {     // przepisujemy rate_float dla danej waluty to tablicy, która będzie podstawą wykresu
                if (x) { return x.bpi[chartCurrency].rate_float; }
                return 0;
            }),
            chartDataTime = this.props.dataArray.map(function(x) {     // przepisujemy rate_float dla danej waluty to tablicy, która będzie podstawą wykresu
                if (x) { return x.time.updatedISO; }
                return 0;
            }),

            lines = [], // tablica zawierająca koljne linie wykresu (obiekty svg line)
            maxValue = chartData[chartData.length-1], // maksymalna wartość na wykresie
            minValue = chartData[chartData.length-1], // minimalna wartość na wykresie
            unitValue, // ile pikseli odpowiada jednostce wartości na wykresie (użyjemy tego do skalowania wykresu w pionie)
            coords = {}; // koordynaty punktów do rysowania linii wykresu

        // najpierw ustalamy najwyższą i najniższą wartość na wykresie (pomijając zera)
        for (let i = 0; i < this.props.dataArray.length; i ++) {
            if (chartData[i] > 0) {
                if (chartData[i] < minValue) { minValue = chartData[i] };
                if (chartData[i] > maxValue) { maxValue = chartData[i] };
            }
        }

        // jeśli mamy tylko jedną wartość to powiększamy zakres wartości na wykresie 
        if (minValue === maxValue) {
            minValue = minValue - 100;
            maxValue = maxValue + 100;
        }

        // po ustaleniu min i max określamy, w jaki sposób będą skalowane jednostki na wykresie.
        // wykres ma wysokość 201px i za każdym razem jest skalowany tak, aby maxValue było na samej górze wykresu a minValue - na samym dole
        unitValue = 201 / (maxValue - minValue);

        // generujemy kolejne linie na wykresie
        for (let i = 1; i < this.props.dataArray.length; i++) {
            
            // wyznaczamy współrzędne x początku i końca linii
            coords.x1 = (i-1) * 20;
            coords.x2 = i * 20;

            // ustalamy współrzędną y końca poprzedniej linii
            if (chartData[i-1] > 0) {
                coords.y1 = ((maxValue - chartData[i-1]) * unitValue).toString();
            } else {
                coords.y1 = 201;
            }

            // ustalamy współrzędną y końca aktualnej linii
            if (chartData[i] > 0) {
                coords.y2 = ((maxValue - chartData[i]) * unitValue).toString();
            } else {
                coords.y2 = 201;
            }

            // dodajemy linię do tablicy lines[]
            lines.push(<line key={i} className="bitcoin-chart-line" {...coords} /> );
        }
        
        // ostatecznie generujemy obiekt JSX wykresu, który będzie zwrócony przez naszą funkcję
        chartObject = 
            <div>
                <svg className="bitcoin-chart">
                    {this.drawChartLines(minValue, maxValue, chartData, chartDataTime)}
                    {lines}
                </svg>
            </div>;

        return  chartObject;

    }

    drawChartLines(minValue, maxValue, chartData, chartDataTime) {
        var lines = [];

        lines.push( <line key={lines.length} x1={0} x2={1200} y1={201} y2={201} className="chart-line-value" /> );
        lines.push( <line key={lines.length} x1={0} x2={1200} y1={0} y2={0} className="chart-line-value" /> );
        lines.push( <line key={lines.length} x1={1} x2={1} y1={0} y2={201} className="chart-line-value" /> );
        lines.push( <line key={lines.length} x1={1180} x2={1180} y1={0} y2={201} className="chart-line-value" /> );
        lines.push( <line key={lines.length} strokeDasharray="5, 10" x1="0" y1="100" x2="1200" y2="100" className="chart-line-middle" /> );

        for (let i = 0; i < chartData.length; i++) {
            if (chartData[i] > 0) {
                let isoDate = new Date(chartDataTime[i]);
                if ( i % 2 === 0) {
                    lines.push( <line key={lines.length} x1={i*20} x2={i*20} y1="204" y2="210" className="chart-line-value" />);
                    lines.push( <text key={lines.length} x={(i*20)-13} y="232" fill="rgba(0,0,0,0.75)" className="chart-text">{isoDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</text>);
                } else {
                    lines.push( <line key={lines.length} x1={i*20} x2={i*20} y1="204" y2="210" className="chart-line-value" />);
                    lines.push( <text key={lines.length} x={(i*20)-13} y="222" fill="rgba(0,0,0,0.75)" className="chart-text">{isoDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</text>);
                }
            }
        }

        lines.push( <text key={lines.length} x="1185" y="10" fill="rgba(0,96,0,0.75)" className="chart-text">{(parseInt(maxValue * 10000, 10) / 10000).toString()}</text> )
        lines.push( <text key={lines.length} x="1185" y="199" fill="rgba(192,0,0,0.75)" className="chart-text">{(parseInt(minValue * 10000, 10) / 10000).toString()}</text> )
        lines.push( <text key={lines.length} x="1185" y="105" fill="rgba(0,0,0,0.75)" className="chart-text">{(parseInt((((maxValue - minValue) / 2) + minValue) * 10000, 10) / 10000).toString()}</text> )

        return lines;
    }


    toggleShowClick() {
        this.props.toggleShowHandle(this.props.currency);
    }

    render() {
        var buttonText = '',
            currencyChart;

        if (this.props.showChart) { buttonText = 'hide'} else { buttonText = 'show'};

        if (this.props.showChart) { currencyChart = this.getChart() } else { currencyChart = null };
        return (
            <section className="bitcoin-chart-container">
                <h1>Bitcoin ({this.props.currency}) Chart <button onClick={this.toggleShowClick}>{buttonText}</button></h1>
                {currencyChart}
            </section>
        )
    }
}