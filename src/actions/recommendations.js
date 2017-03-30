export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'

export const getRecommendations = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_RECOMMENDATIONS
    })
    return spotifyApi.getRecommendations({
      seed_tracks: getState().seeds.items.map(item => { return item.id })
    })
    .then(function(data) { 
      dispatch({
        type: RECEIVE_RECOMMENDATIONS,
        data
      })
    }, function(err) {
      console.log('Something went wrong!', err)
    })
  }
}
