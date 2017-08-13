import {
  getRecommendations
} from './recommendations'

export const changePage = pagename => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'CHANGE_PAGE',
      pagename
    })

    if(getState().seeds.count > 0 && getState().recommendations.count === 0 && pagename === 'recommendations') {
      dispatch(getRecommendations())
    }
  }
}
