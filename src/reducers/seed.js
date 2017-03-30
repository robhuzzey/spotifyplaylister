import {
  ADD_SEED,
  REMOVE_SEED
} from '../actions/seed'

const seeds = (state = {
  items: []
}, action) => {
  switch (action.type) {
    case ADD_SEED:
      return Object.assign({}, state, {
        items: [
          action.track,
          ...state.items
        ]
      })
    case REMOVE_SEED:
      return Object.assign({}, state, {
        items: [...state.items].filter(item => item.id !== action.track.id)
      })
    default:
      return state
  }
}

export default seeds
