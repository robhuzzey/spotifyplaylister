import { combineReducers } from 'redux'
import {
  ADD_SEED,
  REMOVE_SEED,
  REQUEST_RECOMMENDATIONS,
  RECEIVE_RECOMMENDATIONS,
  LOAD_TRACK,
  UNLOAD_TRACK
} from './actions'

import {
  RECEIVED_ALL_ARTISTS
} from './actions/getUsersTracks'

import albums from './reducers/albums'
import userTracks from './reducers/userTracks'
import authenticate from './reducers/authenticate'

const artists = (state = {
  items: [],
  total: 0
}, action) => {
  switch (action.type) {
    case RECEIVED_ALL_ARTISTS:
      return Object.assign({}, state, {
        items: action.artists,
        total: action.artists.length
      })
    default:
      return state
  }
}

const seeds = (state = {
  items: []
}, action) => {
  switch (action.type) {
    case ADD_SEED:
      return Object.assign({}, state, {
        items: [
          action.track,
          ...state.items
        ]
      })
    case REMOVE_SEED:
      return Object.assign({}, state, {
        items: [...state.items].filter(item => item.id !== action.track.id)
      })
    default:
      return state
  }
}

const recommendations = (state = {
  items: [],
  isLoading: false
}, action) => {
  switch (action.type) {
    case REQUEST_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.data.body.tracks
      })
    default:
      return state
  }

}

const player = (state = {
  track: {}
}, action) => {
  switch (action.type) {
    case LOAD_TRACK:
      return Object.assign({}, state, {
        track: action.track
      })
    case UNLOAD_TRACK:
      return Object.assign({}, state, {
        track: {}
      })
    default:
      return state
  }

}

const rootReducer = combineReducers({
  albums,
  artists,
  authenticate,
  userTracks,
  seeds,
  recommendations,
  player
})

export default rootReducer
