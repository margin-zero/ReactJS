import React from 'react';
import './index.css';

import BitcoinChart from './BitcoinChart';
import BitcoinTable from './BitcoinTable';

export default class Bitcoin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            showChart: {
                'USD': true,
                'GBP': true,
                'EUR': true
            }
        };

        this.fetchData = this.fetchData.bind(this);
        this.toggleShowHandle = this.toggleShowHandle.bind(this);
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
                showChart={this.state.showChart[currency]}
                toggleShowHandle={this.toggleShowHandle}
            />
        )
    }

    toggleShowHandle(currency) {
        var newShowChart = this.state.showChart;

        newShowChart[currency] = !newShowChart[currency];

        this.setState({ showChart: newShowChart });
    }

    getPriceTable() {
        
        return (
            <BitcoinTable dataArray={this.state.dataArray} />
        );
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
                {this.getBitcoinChart('EUR')}

                {this.getPriceTable()}
                <footer>
                Powered by <a href="https://www.coindesk.com/price/">CoinDesk</a>
                </footer>
            </div>
            
        )
    }
}
