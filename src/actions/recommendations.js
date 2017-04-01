export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'

import {
  CHANGE_PAGE
} from './navigation'

export const getRecommendations = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_RECOMMENDATIONS
    })

    // Only passes the first 5 items dues to restrictions from spotify API.
    return spotifyApi.getRecommendations({
      seed_tracks: getState().seeds.items.slice(0, 5).map(item => { return item.id })
    })
    .then(data => { 
      dispatch({
        type: RECEIVE_RECOMMENDATIONS,
        data
      })

      dispatch({
        type: CHANGE_PAGE,
        pagename: 'recommendations'
      })
    }, err => {
      console.log('Something went wrong!', err)
    })
  }
}
