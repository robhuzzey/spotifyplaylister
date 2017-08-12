export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'
export const CLEAR_RECOMMENDATIONS = 'CLEAR_RECOMMENDATIONS'

import {
  changePage
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
      dispatch(changePage('recommendations'))
    }, err => {
      console.log('Something went wrong!', err)
    })
  }
}

export const clearRecommendations = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_RECOMMENDATIONS
    })
  }
}
