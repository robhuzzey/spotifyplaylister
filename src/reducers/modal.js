const modal = (state = {
  show: false,
  title: '',
  body: ''
}, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
        show: !state.show
      })
    case 'SET_MODAL':
      return Object.assign({}, state, {
        title: action.title,
        body: action.body,
        show: true
      })
    default:
      return state
  }
}

export default modal
