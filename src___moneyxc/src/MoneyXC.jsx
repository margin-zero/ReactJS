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
            <div>
                <h1>Money Exchange Rate Calculator</h1>

                <select value={this.state.currencyFrom} onChange={this.handleCurrencyChangeFrom}>
                    {this.getCurrencyOptions()}
                </select>

                <select value={this.state.currencyTo} onChange={this.handleCurrencyChangeTo}>
                    {this.getCurrencyOptions()}
                </select>

                {this.getConverter(this.state.currencyFrom, this.state.currencyTo)}
                {this.getConverter(this.state.currencyTo, this.state.currencyFrom)}
            </div>
            
        )
    }
}
