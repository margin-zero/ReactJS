import React from 'react';
import './index.css';

export default class Bitcoin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataArray: {}
        };

    }

    fetchData() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((resp) => resp.json())
        .then((data) => this.setState({dataArray: data}));
    }



    render() { 
        
        return (
            <div className="app-container">

                <footer>
                Powered by <a href="https://www.coindesk.com/price/">CoinDesk</a>
                </footer>
            </div>
            
        )
    }
}
