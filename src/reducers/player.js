import {
  LOAD_TRACK,
  UNLOAD_TRACK
} from '../actions/player'

const player = (state = {
  track: {}
}, action) => {
  switch (action.type) {
    case LOAD_TRACK:
      return Object.assign({}, state, {
        track: action.track
      })
    case UNLOAD_TRACK:
      return Object.assign({}, state, {
        track: {}
      })
    default:
      return state
  }

}

export default player
