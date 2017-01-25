import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

document.addEventListener('click', function(e) {
    console.log(e.target);
});
