import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({spotifyApi})
    )
  )
)

import style from './style.css'

import Main from './containers/Main.jsx'

(() => {
  render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('application')
  )
})()

