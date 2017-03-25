import { combineReducers } from 'redux'
import {
  REQUEST_ALL_TRACKS,
  RECEIVE_TRACKS,
  RECEIVED_ALL_TRACKS,
  RECEIVED_ALL_ALBUMS,
  RECEIVED_ALL_ARTISTS,
  ADD_SEED,
  REQUEST_RECOMMENDATIONS,
  RECEIVE_RECOMMENDATIONS
} from './actions'

const userTracks = (state = {
  items: [],
  isFetching: false,
  total: 0
}, action) => {
  switch (action.type) {
    case REQUEST_ALL_TRACKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TRACKS:
      const items = state.items.concat(action.data.body.items.map(item => item.track));
      return Object.assign({}, state, {
        items,
        isFetching: false
      })
    case RECEIVED_ALL_TRACKS:
      return Object.assign({}, state, {
        total: action.total
      })
    default:
      return state
  }
}

const albums = (state = {
  items: [],
  total: 0
}, action) => {
  switch (action.type) {
    case RECEIVED_ALL_ALBUMS:
      return Object.assign({}, state, {
        items: action.albums,
        total: action.albums.length
      })
    default:
      return state
  }
}

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
      const items = [
        ...state.items,
        action.track
      ]
      return Object.assign({}, state, {
        items
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

const rootReducer = combineReducers({
  albums,
  artists,
  userTracks,
  seeds,
  recommendations
})

export default rootReducer
