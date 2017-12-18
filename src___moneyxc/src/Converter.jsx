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
            <div className="currency-converter">
                <p className="currency-count">1 <span className="currency-symbol">{symbolFrom}</span></p>
                <p className="currency-equal">=</p>
                <p className="currency-count">{this.convertMoney(symbolFrom, symbolTo)} <span className="currency-symbol">{symbolTo}</span></p>


                <p className="currency-name">{nameFrom}</p>
                <p className="currency-space">&nbsp;</p>
                <p className="currency-name">{nameTo}</p>

            </div>
        )
    }
}