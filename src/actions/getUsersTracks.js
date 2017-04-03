export const REQUEST_ALL_TRACKS = 'REQUEST_ALL_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'
export const RECEIVED_ALL_TRACKS = 'RECEIVED_ALL_TRACKS'

import {
  REQUEST_AUTHENTICATION
} from './authenticate'

import {
  getArtists
} from './getArtists'

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
      if(data.body.next) {
        const newOffset = data.body.offset + data.body.limit
        dispatch(getUsersTracks(newOffset))
      } else {
        const items = getState().userTracks.items
        dispatch({
          type: RECEIVED_ALL_TRACKS,
          total: items.length
        })

        const artistIds = []
        items.map(item => {
          item.artists.map(artist => {
            artistIds.push(artist.id)
          })
        });

        dispatch(getArtists(artistIds.filter((v, i, a) => a.indexOf(v) === i)))
      }
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
