const defaultState = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0,
  offset: 0,
  limit: 50,
  allLoaded: false,
  chosenPlaylistId: null,
  playlistOwnerId: null
}
const playlists = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_CREATE_PLAYLIST':
      return Object.assign({}, defaultState, {
        chosenPlaylistId: action.data.body.id,
        playlistOwnerId: action.data.body.owner.id,
        chosenPlaylistName: action.data.body.name
      })
    case 'RECEIVE_USERS_PLAYLISTS':
      const items = state.items.concat(action.data.body.items);
      return Object.assign({}, state, {
        items,
        isFetching: false,
        total: action.data.body.total,
        count: items.length,
        offset: action.data.body.offset + action.data.body.limit,
        allLoaded: !action.data.body.next
      })
    case 'CHOOSE_USER_PLAYLIST':
      const chosenPlaylist = state.items.find(playlist => playlist.id === action.playlistId)
      const playlistOwnerId = chosenPlaylist ? chosenPlaylist.owner.id : null
      return Object.assign({}, state, {
        chosenPlaylistName: action.playlistName,
        chosenPlaylistId: action.playlistId,
        playlistOwnerId
      })
    default:
      return state
  }
}

export default playlists
