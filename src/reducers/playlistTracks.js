import {
  REQUEST_PLAYLIST_TRACKS,
  RECEIVE_PLAYLIST_TRACKS
} from '../actions/getPlaylistTracks'

import {
  CHOOSE_USER_PLAYLIST
} from '../actions/getUsersPlaylists'

const defaultState = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0,
  offset: 0,
  limit: 50,
  allLoaded: false,
}
const playlistTracks = (state = defaultState, action) => {
  switch (action.type) {

    case CHOOSE_USER_PLAYLIST:
      return defaultState

    case REQUEST_PLAYLIST_TRACKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PLAYLIST_TRACKS:
      const items = state.items.concat(action.data.body.items);
      return Object.assign({}, state, {
        items,
        isFetching: false,
        total: action.data.body.total,
        count: items.length,
        offset: action.data.body.offset + action.data.body.limit,
        allLoaded: !action.data.body.next
      })
    default:
      return state
  }
}

export default playlistTracks
