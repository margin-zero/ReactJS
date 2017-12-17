import React from 'react';
import './index.css';

import Converter from './Converter'
import {CURRENCY_NAMES} from './CurrencyNames'

export default class MoneyXC extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            conversionRates: {},
            currencyFrom: 'RON',
            currencyTo: 'ILS'
        };
    }

    componentWillMount() {
        fetch('https://api.fixer.io/latest')
        .then((resp) => resp.json())
        .then((data) => this.setState({conversionRates: data}, function() {
            var newCR = this.state.conversionRates;
            newCR.rates.EUR = 1;
            //newCR.names = CURRENCY_NAMES;
            this.setState({conversionRates: newCR});
        }))
    }


    getConverter(currencyFrom, currencyTo) {
        if (this.state.conversionRates.rates) {
            return (
                <div>
                
                <Converter
                    conversionRates={this.state.conversionRates}
                    currencyFrom={currencyFrom}
                    currencyTo={currencyTo}
                    currencyNames={CURRENCY_NAMES}
                />
                </div>
            )
        }

        return '';
    }


    render() { 
        
        return (
            <div>
                <h1>Money Exchange Rate Calculator</h1>
                {this.getConverter(this.state.currencyFrom, this.state.currencyTo)}
                {this.getConverter(this.state.currencyTo, this.state.currencyFrom)}
            </div>
            
        )
    }
}
