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

    getBitcoinChart() {
        return (
            <BitcoinChart
                dataArray={this.state.dataArray}
                currency='USD'
            />
        )
    }



    render() { 
        var lines = [];

        for (let i = this.state.dataArray.length-1; i > 0; i--) {
            if (this.state.dataArray[i]) {
            lines.push(
                <p key={i}>{this.state.dataArray[i].time.updated} --- 
                    USD: {this.state.dataArray[i].bpi.USD.rate_float} ---
                    GBP: {this.state.dataArray[i].bpi.GBP.rate_float} ---
                    EUR: {this.state.dataArray[i].bpi.EUR.rate_float}
                    </p>
            )
            }
        }

        return (
            <div className="app-container">
                <h1>Bitcoin Price Index</h1>
                {this.getBitcoinChart()}
                {lines}
                <footer>
                Powered by <a href="https://www.coindesk.com/price/">CoinDesk</a>
                </footer>
            </div>
            
        )
    }
}
