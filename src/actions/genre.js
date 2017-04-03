export const ADD_GENRE = 'ADD_GENRE'
export const REMOVE_GENRE = 'REMOVE_GENRE'

export const addGenre = genre => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: ADD_GENRE,
      genre
    })
  }
}

export const removeGenre = genre => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REMOVE_GENRE,
      genre
    })
  }
}
