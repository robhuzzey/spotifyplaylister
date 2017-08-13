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

export const checkAccessToken = () => {
  return (dispatch, getState, {spotifyApi}) => {
    const now = new Date();
    const expires = getState().authenticate.expires
    if(!expires || expires < now) {
      return dispatch(setAccessToken())
    }
    dispatch({
      type: 'IS_AUTHENTICATED'
    })
  }
}

const setAccessToken = () => {
  return (dispatch, getState, {spotifyApi}) => {
    const accessToken = parseHash(window.location.hash).access_token
    const expires = parseHash(window.location.hash).expires_in
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      accessToken,
      expires
    })
    spotifyApi.setAccessToken(accessToken)
  }
}

export const authenticate = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_AUTHENTICATION'
    })
  }
}

export const getMe = () => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: 'REQUEST_LOGGED_IN_USER_DETAILS'
    })

    return spotifyApi.getMe().then(data => { 
      dispatch({
        type: 'RECEIVE_LOGGED_IN_USER_DETAILS',
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
