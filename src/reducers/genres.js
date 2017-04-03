import {
  ADD_GENRE,
  REMOVE_GENRE
} from '../actions/genre'

import {
  RECEIVED_ALL_ARTISTS,
  REQUEST_ALL_ARTISTS
} from '../actions/getArtists'

const genres = (state = {
  genre: null,
  loading: false
}, action) => {
  switch (action.type) {
    case ADD_GENRE:
      return Object.assign({}, state, {
        genre: action.genre
      })
    case REMOVE_GENRE:
      return Object.assign({}, state, {
        genre: null
      })
    case RECEIVED_ALL_ARTISTS:
      return Object.assign({}, state, {
        loading: false
      })
    case REQUEST_ALL_ARTISTS:
      return Object.assign({}, state, {
        loading: true
      })
    default:
      return state
  }
}

export default genres
