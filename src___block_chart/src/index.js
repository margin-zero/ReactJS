import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './manifest.json';

class Application extends React.Component {

        render() { 
            return (
                <h1>Block chart - initial</h1>
            )
        }
    }

// =====================================

ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );

// ====================================