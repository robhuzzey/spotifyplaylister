export const REQUEST_ALL_ARTISTS = 'REQUEST_ALL_ARTISTS'
export const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS'
export const RECEIVED_ALL_ARTISTS = 'RECEIVED_ALL_ARTISTS'

import {
  REQUEST_AUTHENTICATION
} from './authenticate'

export const getArtists = (artistIds, begin = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_ALL_ARTISTS
    })
    const artistIdsBatch = artistIds.splice(begin, limit)
    if(artistIdsBatch.length) {
      return spotifyApi.getArtists(artistIdsBatch)
      .then(data => {
        dispatch({
          type: RECEIVE_ARTISTS,
          data
        })
        dispatch(getArtists(artistIds))
      }, err =>  {
        if(err.statusCode === 401) {
          dispatch({
            type: REQUEST_AUTHENTICATION
          })
        }
        console.log('Something went wrong!', err)
      }) 
    } else {
      dispatch({
        type: RECEIVED_ALL_ARTISTS,
        items: getState().artists.items
      })
    }
  }
}
