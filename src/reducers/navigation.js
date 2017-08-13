const navigation = (state = {
  page: 'tracks'
}, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.pagename
      })
    default:
      return state
  }
}

export default navigation
