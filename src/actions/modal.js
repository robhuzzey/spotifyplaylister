export const toggle = genre => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'TOGGLE_MODAL'
    })
  }
}

export const set = (title, body) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'SET_MODAL',
      title,
      body
    })
  }
}
