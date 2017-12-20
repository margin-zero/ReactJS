import React from 'react';


export default class BitcoinChart extends React.Component {
    render() {
        return (
            <section>
                <h1>Bitcoin Chart!</h1>
                <p>chart for {this.props.currency}</p>
            <div style={{width: '1200px', height: '200px', background: 'yellow'}}>
                <div style={{width: '20px', height: '150px', background: 'red'}}></div>
            </div>
            </section>
        )
    }
}