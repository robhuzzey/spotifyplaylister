export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const SET_MODAL = 'SET_MODAL'

export const toggle = genre => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: TOGGLE_MODAL
    })
  }
}

export const set = (title, body) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: SET_MODAL,
      title,
      body
    })
  }
}
