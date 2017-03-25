import SpotifyWebApi from 'spotify-web-api-node'

const spotify = new SpotifyWebApi()

export const REQUEST_ALL_TRACKS = 'REQUEST_ALL_TRACKS'
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS'
export const RECEIVED_ALL_TRACKS = 'RECEIVED_ALL_TRACKS'
export const RECEIVED_ALL_ALBUMS = 'RECEIVED_ALL_ALBUMS'
export const RECEIVED_ALL_ARTISTS = 'RECEIVED_ALL_ARTISTS'
export const ADD_SEED = 'ADD_SEED'
export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS'
export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS'

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
  const access_token = parseHash(window.location.hash).access_token
  spotify.setAccessToken(access_token)
}

export const authenticate = () => {
  const redirectUri = encodeURIComponent('http://www.robhuzzey.co.uk/spotifyplaylister/');
  const clientId = '214aa492fc5142cda977c15cf3fb40c6';
  const scopes = encodeURIComponent([
    'user-library-read',
    'user-library-modify',
    'user-read-private',
    'playlist-modify-public'
  ].join(' '));
  return window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&scope=${scopes}&show_dialog=true&response_type=token&redirect_uri=${redirectUri}`;
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
