import SpotifyWebApi from 'spotify-web-api-node'

const spotify = new SpotifyWebApi()

export const REQUEST_ALL_TRACKS = 'REQUEST_ALL_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'
export const RECEIVED_ALL_TRACKS = 'RECEIVED_ALL_TRACKS'
export const RECEIVED_ALL_ALBUMS = 'RECEIVED_ALL_ALBUMS'
export const RECEIVED_ALL_ARTISTS = 'RECEIVED_ALL_ARTISTS'
export const ADD_SEED = 'ADD_SEED'
export const REMOVE_SEED = 'REMOVE_SEED'
export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'
export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION'
export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'

const parseHash = hash => {
  return hash.replace('#','')
    .split('&')
    .reduce((accumulator, part) => {
      let parts = part.split('=');
      if (parts.length === 2) {
        accumulator[parts[0]] = parts[1];
      }
      return accumulator;
    },
  {});
}

const setAccessToken = () => {
  return (dispatch, getState) => {
    const accessToken = parseHash(window.location.hash).access_token
    const expires = parseHash(window.location.hash).expires_in
    dispatch({
      type: SET_ACCESS_TOKEN,
      accessToken,
      expires
    })
    spotify.setAccessToken(accessToken)
  }
}

export const checkAccessToken = () => {
  return (dispatch, getState) => {
    const now = new Date();
    const expires = getState().authenticate.expires
    if(!expires || expires < now) {
      return dispatch(setAccessToken())
    }
    dispatch({
      type: IS_AUTHENTICATED
    })
  }
}

export const authenticate = () => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_AUTHENTICATION
    })
  }
}

export const getUsersTracks = (offset = 0, limit = 50) => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_ALL_TRACKS
    })
    // Get tracks in the signed in user's Your Music library
    setAccessToken()
    return spotify.getMySavedTracks({
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

export const addSeed = trackId => {
  return (dispatch, getState) => {

    const track = getState().userTracks.items.find(track => {
      return track.id === trackId
    })

    dispatch({
      type: ADD_SEED,
      track: track
    })
  }
}

export const removeSeed = trackId => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_SEED,
      trackId
    })
  }
}

export const getRecommendations = () => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST_RECOMMENDATIONS
    })
    // Get tracks in the signed in user's Your Music library
    setAccessToken()
    return spotify.getRecommendations({
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
