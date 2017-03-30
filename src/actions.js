export const ADD_SEED = 'ADD_SEED'
export const REMOVE_SEED = 'REMOVE_SEED'
export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'
export const LOAD_TRACK = 'LOAD_TRACK'
export const UNLOAD_TRACK = 'UNLOAD_TRACK'

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

export const getRecommendations = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_RECOMMENDATIONS
    })
    // Get tracks in the signed in user's Your Music library
    setAccessToken()
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

export const loadTrack = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: LOAD_TRACK,
      track
    })
  }
}

export const unloadTrack = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: UNLOAD_TRACK
    })
  }
}
