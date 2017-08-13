const artists = (state = {
  items: [],
  isFetching: false,
  count: 0
}, action) => {
  switch (action.type) {
    case 'REQUEST_ALL_ARTISTS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_ARTISTS':
      const items = state.items.concat(action.data.body.artists);
      return Object.assign({}, state, {
        items,
        isFetching: true,
        count: items.length
      })
    case 'RECEIVED_ALL_ARTISTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items
      })
    default:
      return state
  }
}

export default artists
