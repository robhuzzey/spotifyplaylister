export const LOAD_TRACK = 'LOAD_TRACK'
export const UNLOAD_TRACK = 'UNLOAD_TRACK'
export const TRACK_LOADED = 'TRACK_LOADED'

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

export const trackLoaded = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: TRACK_LOADED
    })
  }
}
