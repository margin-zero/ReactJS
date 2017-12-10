import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './manifest.json';

import BlockChart from './BlockChart';

// =====================================

var root = document.getElementById('root');

ReactDOM.render(
    <BlockChart {...(root.dataset)}/>,
    root
  );

// ====================================