import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './manifest.json';

import DogBrowser from './DogBrowser';

// =====================================

var root = document.getElementById('root');

ReactDOM.render(
    <DogBrowser />,
    root
  );

// ====================================