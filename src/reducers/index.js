import { combineReducers } from 'redux'

import userTracks from './userTracks'
import authenticate from './authenticate'
import player from './player'
import seeds from './seed'
import recommendations from './recommendations'
import navigation from './navigation'
import modal from './modal'
import playlists from './playlists'
import playlistTracks from './playlistTracks'

const rootReducer = combineReducers({
  authenticate,
  userTracks,
  seeds,
  recommendations,
  player,
  navigation,
  modal,
  playlists,
  playlistTracks
})

export default rootReducer
