export const REQUEST_ALL_TRACKS = 'REQUEST_ALL_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'
export const RECEIVED_ALL_TRACKS = 'RECEIVED_ALL_TRACKS'
export const RECEIVED_ALL_ALBUMS = 'RECEIVED_ALL_ALBUMS'
export const RECEIVED_ALL_ARTISTS = 'RECEIVED_ALL_ARTISTS'

export const getUsersTracks = (offset = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REQUEST_ALL_TRACKS
    })
    return spotifyApi.getMySavedTracks({
      limit,
      offset
    })
    .then(function(data) {      
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

        const albums = items.map(item => {
          return item.album
        }).filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos
        });

        dispatch({
          type: RECEIVED_ALL_ALBUMS,
          albums
        })

        const allArtists = [];
        albums.map(album => {
          album.artists.map(artist => {
            allArtists.push(artist)
          })
        })

        const artists = allArtists.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos
        });

        dispatch({
          type: RECEIVED_ALL_ARTISTS,
          artists
        })

      }
    }, function(err) {
      console.log('Something went wrong!', err)
    })
  }
}
