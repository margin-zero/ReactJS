import React from 'react';

export default class Converter extends React.Component {

    convertMoney(currencyFrom, currencyTo) {
        var rateFrom = this.props.conversionRates.rates[currencyFrom],
            rateTo = this.props.conversionRates.rates[currencyTo];

        return parseInt(((rateTo / rateFrom)*100000),10) / 100000;
    }

    render() {
        var symbolFrom = this.props.currencyFrom,
            nameFrom = this.props.currencyNames[this.props.currencyFrom],
            symbolTo = this.props.currencyTo,
            nameTo = this.props.currencyNames[this.props.currencyTo];

        return (
            <p>1 {symbolFrom} ({nameFrom}) = {this.convertMoney(symbolFrom, symbolTo) + ' ' + symbolTo} ({nameTo})</p>
        )
    }
}