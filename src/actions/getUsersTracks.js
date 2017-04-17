export const REQUEST_ALL_TRACKS = 'REQUEST_ALL_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'

import {
  REQUEST_AUTHENTICATION
} from './authenticate'

export const getUsersTracks = (offset = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_ALL_TRACKS
    })
    return spotifyApi.getMySavedTracks({
      limit,
      offset
    })
    .then(data => { 
      dispatch({
        type: RECEIVE_TRACKS,
        data
      })
    }, err =>  {
      if(err.statusCode === 401) {
        dispatch({
          type: REQUEST_AUTHENTICATION
        })
      }
      console.log('Something went wrong!', err)
    })
  }
}
