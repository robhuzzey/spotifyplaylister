export const addUserTrack = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'ADD_USER_TRACK_REQUEST',
      track
    })
    // Add tracks to the signed in user's Your Music library
    spotifyApi.addToMySavedTracks([track.id]).then(function() {
      dispatch({
        type: 'ADD_USER_TRACK_RESPONSE',
        track
      })
    }, function(err) {
      dispatch({
        type: 'ADD_USER_TRACK_FAILED',
        track
      })
    })
  }
}
