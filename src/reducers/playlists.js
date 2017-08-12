import {
  RECEIVE_USERS_PLAYLISTS,
  CHOOSE_USER_PLAYLIST
} from '../actions/getUsersPlaylists'

const playlists = (state = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0,
  offset: 0,
  limit: 50,
  allLoaded: false,
  chosenPlaylistId: null,
  playlistOwnerId: null
}, action) => {
  switch (action.type) {
    case RECEIVE_USERS_PLAYLISTS:
      const items = state.items.concat(action.data.body.items);
      return Object.assign({}, state, {
        items,
        isFetching: false,
        total: action.data.body.total,
        count: items.length,
        offset: action.data.body.offset + action.data.body.limit,
        allLoaded: !action.data.body.next
      })
    case CHOOSE_USER_PLAYLIST:
      const playlistOwnerId = state.items.find(playlist => playlist.id === action.playlistId).owner.id
      return Object.assign({}, state, {
        chosenPlaylistId: action.playlistId,
        playlistOwnerId
      })
    default:
      return state
  }
}

export default playlists
