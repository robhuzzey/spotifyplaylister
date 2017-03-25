import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunkMiddleware
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

