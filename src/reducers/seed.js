const seeds = (state = {
  items: [],
  count: 0,
  view: false,
  playlistId: null,
  playlistName: null
}, action) => {
  let items;
  switch (action.type) {
    case 'ADD_SEED':
      items = [
        action.track,
        ...state.items
      ]
      return Object.assign({}, state, {
        items,
        count: items.length
      })
    case 'REMOVE_SEED':
      items = [...state.items].filter(item => item.id !== action.track.id)
      return Object.assign({}, state, {
        items,
        count: items.length
      })
    case 'VIEW_SEEDS_TOGGLE':
      return Object.assign({}, state, {
        view: !state.view
      })
    default:
      return state
  }
}

export default seeds
