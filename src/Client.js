import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Importing the middleware and thunks
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combined reducers
import reducers from './reducers/index';

// Create the middleware logger for showing logs and including the thunks
const middleware = applyMiddleware(thunk, logger);
// Create the store passing in the reducer
const store = createStore(reducers, middleware);

import Chat from './components/Chat';

render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  document.getElementById('app')
);
