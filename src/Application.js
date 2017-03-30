import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import injectTapEventPlugin from 'react-tap-event-plugin';
 
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

import SpotifyWebApi from 'spotify-web-api-node'
const spotifyApi = new SpotifyWebApi()

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunk.withExtraArgument({spotifyApi})
  )
)

import Main from './components/Main.jsx'

(() => {
  render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('application')
  )
})()

