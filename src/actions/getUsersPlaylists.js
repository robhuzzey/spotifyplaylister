export const getUsersPlaylists = (offset = 0, limit = 50) => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_USERS_PLAYLISTS'
    })
    return spotifyApi.getUserPlaylists(null, {
      limit,
      offset
    })
    .then(data => {
      dispatch({
        type: 'RECEIVE_USERS_PLAYLISTS',
        data
      })
    }, err =>  {
      if(err.statusCode === 401) {
        dispatch({
          type: 'REQUEST_AUTHENTICATION'
        })
      }
      console.log('Something went wrong!', err)
    })
  }
}

export const choosePlaylist = (playlistId, playlistName) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CHOOSE_USER_PLAYLIST',
      playlistId,
      playlistName
    })
  }
}

export const createPlaylist = (playListName) => {
  return (dispatch, getState, {spotifyApi}) => {
    const userId = getState().authenticate.id
    dispatch({
      type: 'REQUEST_CREATE_PLAYLIST'
    })
    return spotifyApi.createPlaylist(userId, playListName)
    .then(data => {
      dispatch({
        type: 'RECEIVE_CREATE_PLAYLIST',
        data
      })
    }, err =>  {
      if(err.statusCode === 401) {
        dispatch({
          type: 'REQUEST_AUTHENTICATION'
        })
      }
      console.log('Something went wrong!', err)
    })
  }
}

export const addTracksToPlaylist = (playListId, tracks) => {
  return (dispatch, getState, {spotifyApi}) => {
    const userId = getState().authenticate.id
    dispatch({
      type: 'REQUEST_ADD_TRACKS_TO_PLAYLIST'
    })
    return spotifyApi.addTracksToPlaylist(userId, playListId, tracks)
    .then(data => {
      dispatch({
        type: 'RECEIVE_ADD_TRACKS_TO_PLAYLIST',
        data
      })
    }, err =>  {
      if(err.statusCode === 401) {
        dispatch({
          type: 'REQUEST_AUTHENTICATION'
        })
      }
      console.log('Something went wrong!', err)
    })
  }
}
