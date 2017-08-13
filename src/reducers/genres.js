const genres = (state = {
  genre: null,
  loading: false,
  all: [],
  showList: false
}, action) => {
  switch (action.type) {
    case 'TOGGLE_LIST':
      return Object.assign({}, state, {
        showList: !state.showList
      })
    case 'ADD_GENRE':
      return Object.assign({}, state, {
        genre: action.genre,
        showList: false
      })
    case 'REMOVE_GENRE':
      return Object.assign({}, state, {
        genre: null,
        showList: false
      })
    case 'RECEIVED_ALL_ARTISTS':
      const all = []
      action.items.map(item => {
        item.genres.map(genre => {
          const genreObj = all.find(obj => obj.name === genre)
          if(genreObj) {
            genreObj.count += 1
          } else {
            all.push({
              name: genre,
              count: 1
            })
          }
        })
      })

      all.sort((a, b) => {
        return b.count - a.count 
      })

      return Object.assign({}, state, {
        loading: false,
        all
      })
    case 'REQUEST_ALL_ARTISTS':

      return Object.assign({}, state, {
        loading: true
      })
    default:
      return state
  }
}

export default genres
