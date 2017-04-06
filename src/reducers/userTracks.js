import {
  REQUEST_ALL_TRACKS,
  RECEIVE_TRACKS,
  RECEIVED_ALL_TRACKS
} from '../actions/getUsersTracks'

import {
  RECEIVED_ALL_ARTISTS
} from '../actions/getArtists'

import {
  ADD_USER_TRACK_REQUEST,
  ADD_USER_TRACK_RESPONSE,
  ADD_USER_TRACK_FAILED
} from '../actions/addUserTrack'

const userTracks = (state = {
  items: [],
  isFetching: false,
  total: 0,
  count: 0,
  addingUserTrack: null,
  addingUserTrackFailed: null
}, action) => {
  switch (action.type) {
    case RECEIVED_ALL_ARTISTS:
      const tracksForArtists = state.items
      tracksForArtists.map(track => {
        const trackArtistIds = track.artists.map(artist => artist.id)
        const artistGenres = (action.items.find(artist => trackArtistIds.indexOf(artist.id) !== -1) || {}).genres
        track.genres = (track.genres || []).concat(artistGenres)
        return track
      })
      return Object.assign({}, state, {
        items: tracksForArtists
      })
    case REQUEST_ALL_TRACKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TRACKS:
      const items = state.items.concat(action.data.body.items.map(item => item.track));
      return Object.assign({}, state, {
        items,
        isFetching: true,
        total: action.data.body.total,
        count: items.length
      })
    case RECEIVED_ALL_TRACKS:
      return Object.assign({}, state, {
        total: action.total,
        isFetching: false
      })
    case ADD_USER_TRACK_REQUEST:
      return Object.assign({}, state, {
        addingUserTrack: action.track.id
      })
    case ADD_USER_TRACK_RESPONSE:
      return Object.assign({}, state, {
        // items: [
        //   action.track,
        //   ...state.items
        // ],
        addedUserTrack: action.track.id
      })
    case ADD_USER_TRACK_FAILED:
      return Object.assign({}, state, {
        addingUserTrack: null,
        addingUserTrackFailed: action.track.id
      })
    default:
      return state
  }
}

export default userTracks
