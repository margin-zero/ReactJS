import React from 'react';
import './index.css';

import BitcoinChart from './BitcoinChart';

export default class Bitcoin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataArray: []
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.initDataArray();
    }

    initDataArray() {
        var newDataArray = this.state.dataArray;

        for (let i = 0; i < 60; i++) {
            newDataArray.push(null);
        }
        this.setState({dataArray: newDataArray}, this.setFetchInterval)
    }

    setFetchInterval() {
        this.fetchData();
        setInterval(this.fetchData, 60000);
    }

    fetchData() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((resp) => resp.json())
        .then((data) => {
            let newDataArray = this.state.dataArray;
            newDataArray.push(data);
            newDataArray.shift();
            this.setState({dataArray: newDataArray});
        });
    }

    getBitcoinChart(currency) {
        return (
            <BitcoinChart
                dataArray={this.state.dataArray}
                currency={currency}
            />
        )
    }

    getPriceTable() {
        var tableObject,
            chartData = this.state.dataArray.map(
                function(x) { 
                    if (x) { 
                        let isoDate = new Date(x.time.updatedISO);
                        return ({
                        "USD": x.bpi['USD'].rate_float,
                        "changeUSD": '0.0000',
                        "GBP": x.bpi['GBP'].rate_float,
                        "changeGBP": '0.0000',
                        "EUR": x.bpi['EUR'].rate_float,
                        "changeEUR": '0.0000',
                        'updated': isoDate.toLocaleDateString() + ' - ' + isoDate.toLocaleTimeString()
                    })
                }
                return null;
            }),

            lines = [];

        for (let i = chartData.length-1; i >= 0; i--) {
            if (chartData[i]) {

                let differenceClass = 'difference-none';

                if (chartData[i-1]) {
                    let differenceUSD = chartData[i].USD - chartData[i-1].USD,
                        differenceGBP = chartData[i].GBP - chartData[i-1].GBP,
                        differenceEUR = chartData[i].EUR - chartData[i-1].EUR;

                    chartData[i].changeUSD = (differenceUSD).toFixed(4) + ' (' + ((differenceUSD / chartData[i-1].USD) * 100).toFixed(4) + '%)';
                    chartData[i].changeGBP = (differenceGBP).toFixed(4) + ' (' + ((differenceGBP / chartData[i-1].USD) * 100).toFixed(4) + '%)';
                    chartData[i].changeEUR = (differenceEUR).toFixed(4) + ' (' + ((differenceEUR / chartData[i-1].USD) * 100).toFixed(4) + '%)';

                    if ( differenceUSD > 0 ) { 
                        differenceClass = 'difference-positive';
                    } else {
                        differenceClass = 'difference-negative';
                    }
                }

                
                lines.push(
                    <tr>
                        <td>{chartData[i].USD.toFixed(4)}</td>
                        <td className={differenceClass}>{chartData[i].changeUSD}</td>
                        <td className='empty-cell'>&nbsp;</td>
                        <td>{chartData[i].GBP.toFixed(4)}</td>
                        <td className={differenceClass}>{chartData[i].changeGBP}</td>
                        <td className='empty-cell'>&nbsp;</td>
                        <td>{chartData[i].EUR.toFixed(4)}</td>
                        <td className={differenceClass}>{chartData[i].changeEUR}</td>
                        <td className='empty-cell'>&nbsp;</td>
                        <td>{chartData[i].updated}</td>
                    </tr>
                )
            };
        }

        tableObject = 
            <table className="price-table">
                <thead>
                    <tr>
                        <th>price USD</th>
                        <th>change USD</th>
                        <th>&nbsp;</th>
                        <th>price GBP</th>
                        <th>change GBP</th>
                        <th>&nbsp;</th>
                        <th>price EUR</th>
                        <th>change EUR</th>
                        <th>&nbsp;</th>
                        <th>prices updated:</th>
                    </tr>
                </thead>

                <tbody>
                    {lines}
                </tbody>
            </table>;
        
        return tableObject;
    }


    render() { 

        return (
            <div className="app-container">
                <header>
                    <h1>Bitcoin Price Index Charts</h1>
                    <p>updated every 60 sec. based on live data from <a href="https://www.coindesk.com/price/">CoinDesk</a></p>
                </header>

                {this.getBitcoinChart('USD')}
                {this.getBitcoinChart('GBP')}

                {this.getPriceTable()}
                <footer>
                Powered by <a href="https://www.coindesk.com/price/">CoinDesk</a>
                </footer>
            </div>
            
        )
    }
}
