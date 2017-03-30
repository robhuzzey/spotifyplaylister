import {
  RECEIVED_ALL_ALBUMS
} from '../actions/getUsersTracks'

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

export default albums
