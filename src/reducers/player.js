const player = (state = {
  track: {},
  isLoaded: false
}, action) => {
  switch (action.type) {
    case 'LOAD_TRACK':
      return Object.assign({}, state, {
        track: action.track,
        isLoaded: false
      })
    case 'UNLOAD_TRACK':
      return Object.assign({}, state, {
        track: {},
        isLoaded: false
      })
    case 'TRACK_LOADED':
      return Object.assign({}, state, {
        isLoaded: true
      })
    default:
      return state
  }

}

export default player
