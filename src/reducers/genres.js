import {
  ADD_GENRE,
  REMOVE_GENRE
} from '../actions/genre'

import {
  RECEIVED_ALL_ARTISTS,
  REQUEST_ALL_ARTISTS
} from '../actions/getArtists'

const genres = (state = {
  genre: null,
  loading: false,
  all: []
}, action) => {
  switch (action.type) {
    case ADD_GENRE:
      return Object.assign({}, state, {
        genre: action.genre
      })
    case REMOVE_GENRE:
      return Object.assign({}, state, {
        genre: null
      })
    case RECEIVED_ALL_ARTISTS:
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
    case REQUEST_ALL_ARTISTS:

      return Object.assign({}, state, {
        loading: true
      })
    default:
      return state
  }
}

export default genres
