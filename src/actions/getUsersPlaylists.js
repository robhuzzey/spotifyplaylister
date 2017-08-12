export const REQUEST_USERS_PLAYLISTS = 'REQUEST_USERS_PLAYLISTS'
export const RECEIVE_USERS_PLAYLISTS = 'RECEIVE_USERS_PLAYLISTS'
export const CHOOSE_USER_PLAYLIST = 'CHOOSE_USER_PLAYLIST'

import {
  REQUEST_AUTHENTICATION
} from './authenticate'

export const getUsersPlaylists = (offset = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_USERS_PLAYLISTS
    })
    return spotifyApi.getUserPlaylists(null, {
      limit,
      offset
    })
    .then(data => {
      dispatch({
        type: RECEIVE_USERS_PLAYLISTS,
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

export const choosePlaylist = playlistId => {
  return (dispatch, getState) => {
    dispatch({
      type: CHOOSE_USER_PLAYLIST,
      playlistId
    })
  }
}
