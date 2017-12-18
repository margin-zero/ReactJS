import React from 'react';
import './index.css';

import Converter from './Converter'
import {CURRENCY_NAMES} from './CurrencyNames'

export default class MoneyXC extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            conversionRates: {},
            currencyFrom: 'EUR',
            currencyTo: 'EUR'
        };

        this.handleCurrencyChangeFrom = this.handleCurrencyChangeFrom.bind(this);
        this.handleCurrencyChangeTo = this.handleCurrencyChangeTo.bind(this);
    }

    componentWillMount() {
        fetch('https://api.fixer.io/latest')
        .then((resp) => resp.json())
        .then((data) => this.setState({conversionRates: data}, function() {
            var newCR = this.state.conversionRates;
            newCR.rates.EUR = 1;
            this.setState({conversionRates: newCR});
        }))
    }


    getConverter(currencyFrom, currencyTo) {
        if (this.state.conversionRates.rates) {
            return (
                <Converter
                    conversionRates={this.state.conversionRates}
                    currencyFrom={currencyFrom}
                    currencyTo={currencyTo}
                    currencyNames={CURRENCY_NAMES}
                />
            )
        }
        return '';
    }

    getCurrencyOptions() {
        var options = [],
            currencyArray = [];

            currencyArray = Object.entries(CURRENCY_NAMES);

        for (let i=0; i < currencyArray.length; i++) {
            options.push(<option value={currencyArray[i][0]}>{currencyArray[i][0] + ' - ' + currencyArray[i][1]}</option>);
        }

        return (
            options
        )
    }

    handleCurrencyChangeFrom(event) {
        this.setState({currencyFrom: event.target.value})
    }

    handleCurrencyChangeTo(event) {
        this.setState({currencyTo: event.target.value})
    }


    render() { 
        
        return (
            <div className="app-container">
                <header className="header">
                    <h1>Foreign Exchange Rates & Currency Conversion</h1>
                </header>

                <section className="currency-selector">
                    <label>select 1st currency: 
                        <select value={this.state.currencyFrom} onChange={this.handleCurrencyChangeFrom}>
                            {this.getCurrencyOptions()}
                        </select>
                    </label>
                </section>

                <section className="currency-selector">
                    <label>select 2nd currency: 
                        <select value={this.state.currencyTo} onChange={this.handleCurrencyChangeTo}>
                            {this.getCurrencyOptions()}
                        </select>
                    </label>
                </section>

                <section className="currency-info">
                    {this.getConverter(this.state.currencyFrom, this.state.currencyTo)}
                </section>

                <section className="currency-info">
                    {this.getConverter(this.state.currencyTo, this.state.currencyFrom)}
                </section>

                <footer>
                    Foreign exchange rates are based on live data published by&nbsp;
                    <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html">EUROPEAN CENTRAL BANK</a>.
                    Current rates were published on {this.state.conversionRates.date}. <br />
                    This application uses <a href="http://fixer.io">Fixer API</a>.

                </footer>

            </div>
            
        )
    }
}
