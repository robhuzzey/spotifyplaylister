const recommendations = (state = {
  items: [],
  isLoading: false,
  count: 0
}, action) => {
  switch (action.type) {
    case 'CLEAR_RECOMMENDATIONS':
      return Object.assign({}, state, {
        items: []
      })
    case 'REQUEST_RECOMMENDATIONS':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'RECEIVE_RECOMMENDATIONS':
      const items = state.items.concat(action.data.body.tracks);
      return Object.assign({}, state, {
        isLoading: false,
        items,
        count: items.length
      })
    default:
      return state
  }

}

export default recommendations
