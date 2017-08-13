const userTracks = (state = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0,
  offset: 0,
  limit: 50,
  allLoaded: false,
  addingUserTrack: null,
  addingUserTrackFailed: null
}, action) => {
  switch (action.type) {
    case 'REQUEST_ALL_TRACKS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_TRACKS':
      const items = state.items.concat(action.data.body.items.map(item => item.track));
      return Object.assign({}, state, {
        items,
        isFetching: false,
        total: action.data.body.total,
        count: items.length,
        offset: action.data.body.offset + action.data.body.limit,
        allLoaded: !action.data.body.next
      })
    case 'ADD_USER_TRACK_REQUEST':
      return Object.assign({}, state, {
        addingUserTrack: action.track.id
      })
    case 'ADD_USER_TRACK_RESPONSE':
      return Object.assign({}, state, {
        addedUserTrack: action.track.id,
        addingUserTrack: null
      })
    case 'ADD_USER_TRACK_FAILED':
      return Object.assign({}, state, {
        addingUserTrack: null,
        addingUserTrackFailed: action.track.id
      })
    default:
      return state
  }
}

export default userTracks
