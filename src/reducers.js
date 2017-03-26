import { combineReducers } from 'redux'
import {
  REQUEST_ALL_TRACKS,
  RECEIVE_TRACKS,
  RECEIVED_ALL_TRACKS,
  RECEIVED_ALL_ALBUMS,
  RECEIVED_ALL_ARTISTS,
  ADD_SEED,
  REMOVE_SEED,
  REQUEST_RECOMMENDATIONS,
  RECEIVE_RECOMMENDATIONS,
  REQUEST_AUTHENTICATION,
  RECEIVE_AUTHENTICATION,
  SET_ACCESS_TOKEN,
  IS_AUTHENTICATED,
  LOAD_TRACK,
  UNLOAD_TRACK
} from './actions'

const userTracks = (state = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0
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
        isFetching: false,
        total: action.data.body.total,
        count: items.length
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
      return Object.assign({}, state, {
        items: [
          ...state.items,
          action.track
        ]
      })
    case REMOVE_SEED:
      return Object.assign({}, state, {
        items: [...state.items].filter(item => item.id !== action.trackId)
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

const authenticate = (state = {
  isAuthenticated: false,
  isLoading: false,
  accessToken: null,
  expires: null
}, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION:
      const redirectUri = encodeURIComponent('http://www.robhuzzey.co.uk/spotifyplaylister/');
      const clientId = '214aa492fc5142cda977c15cf3fb40c6';
      const scopes = encodeURIComponent([
        'user-library-read',
        'user-library-modify',
        'user-read-private',
        'playlist-modify-public'
      ].join(' '));
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&show_dialog=true&response_type=token&redirect_uri=${redirectUri}`;
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_AUTHENTICATION:
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: true
      })
    case SET_ACCESS_TOKEN:
      const now = new Date()
      const expires = now.setSeconds(now.getSeconds() + action.expires)
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        isAuthenticated: !!action.accessToken,
        expires
      })
    case IS_AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: true
      })
    default:
      return state
  }
}

const player = (state = {
  src: ''
}, action) => {
  switch (action.type) {
    case LOAD_TRACK:
      return Object.assign({}, state, {
        src: action.url,
        name: action.name
      })
    case UNLOAD_TRACK:
      return Object.assign({}, state, {
        src: ''
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
