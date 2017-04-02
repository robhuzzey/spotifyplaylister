import {
  REQUEST_AUTHENTICATION,
  RECEIVE_AUTHENTICATION,
  SET_ACCESS_TOKEN,
  IS_AUTHENTICATED
} from '../actions/authenticate'

const authenticate = (state = {
  isAuthenticated: false,
  isLoading: false,
  accessToken: null,
  expires: null
}, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATION:
      const redirectUri = encodeURIComponent(__SPOTIFY_REDIRECT_URI__);
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

export default authenticate
