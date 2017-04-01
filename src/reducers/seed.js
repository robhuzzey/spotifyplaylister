import {
  ADD_SEED,
  REMOVE_SEED
} from '../actions/seed'

const seeds = (state = {
  items: [],
  count: 0
}, action) => {
  let items;
  switch (action.type) {
    case ADD_SEED:
      items = [
        action.track,
        ...state.items
      ]
      return Object.assign({}, state, {
        items,
        count: items.length
      })
    case REMOVE_SEED:
      items = [...state.items].filter(item => item.id !== action.track.id)
      return Object.assign({}, state, {
        items,
        count: items.length
      })
    default:
      return state
  }
}

export default seeds
