export const CHANGE_PAGE = 'CHANGE_PAGE'

export const changePage = pagename => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: CHANGE_PAGE,
      pagename
    })
  }
}
