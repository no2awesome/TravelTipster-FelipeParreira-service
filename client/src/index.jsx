import React, { Component } from 'react'; // eslint-disable-line no-unused-vars,import/no-unresolved
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars,import/no-unresolved
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import App from './Components/App.jsx'; // eslint-disable-line no-unused-vars

const currentUser = {
  UserID: 1,
  Username: 'Ewald23',
  ThumbnailURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/bowbrick/128.jpg',
};

ReactDOM.render(<App currentHotelID={4} currentUser={currentUser} />, document.getElementById('app'));
