export const ADD_SEED = 'ADD_SEED'
export const REMOVE_SEED = 'REMOVE_SEED'

export const addSeed = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: ADD_SEED,
      track: track
    })
  }
}

export const removeSeed = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REMOVE_SEED,
      track
    })
  }
}
