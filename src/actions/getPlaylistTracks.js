export const REQUEST_PLAYLIST_TRACKS = 'REQUEST_PLAYLIST_TRACKS'
export const RECEIVE_PLAYLIST_TRACKS = 'RECEIVE_PLAYLIST_TRACKS'

import {
  REQUEST_AUTHENTICATION
} from './authenticate'

export const getPlaylistTracks = (playlistId, userId, offset = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_PLAYLIST_TRACKS
    })

    return spotifyApi.getPlaylistTracks(userId, playlistId, {
      limit,
      offset
    })
    .then(data => { 
      dispatch({
        type: RECEIVE_PLAYLIST_TRACKS,
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
