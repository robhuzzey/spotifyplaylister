export const CHANGE_PAGE = 'CHANGE_PAGE'

import {
  getRecommendations
} from './recommendations'

export const changePage = pagename => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: CHANGE_PAGE,
      pagename
    })

    if(getState().recommendations.count === 0 && pagename === 'recommendations') {
      dispatch(getRecommendations())
    }
  }
}
