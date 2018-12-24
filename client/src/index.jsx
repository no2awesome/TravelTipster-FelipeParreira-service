import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars,import/no-unresolved
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import App from './Components/App.jsx'; // eslint-disable-line no-unused-vars

ReactDOM.render(<App currentHotelID={4} currentUserID={1} />, document.getElementById('app'));
