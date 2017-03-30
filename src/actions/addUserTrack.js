export const ADD_USER_TRACK_REQUEST = 'ADD_USER_TRACK_REQUEST'
export const ADD_USER_TRACK_RESPONSE = 'ADD_USER_TRACK_RESPONSE'
export const ADD_USER_TRACK_FAILED = 'ADD_USER_TRACK_FAILED'

export const addUserTrack = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: ADD_USER_TRACK_REQUEST,
      track
    })
    // Add tracks to the signed in user's Your Music library
    spotifyApi.addToMySavedTracks([track.id]).then(function() {
      dispatch({
        type: ADD_USER_TRACK_RESPONSE,
        track
      })
    }, function(err) {
      dispatch({
        type: ADD_USER_TRACK_FAILED,
        track
      })
    })
  }
}
