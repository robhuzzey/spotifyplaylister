import { combineReducers } from 'redux'

import userTracks from './userTracks'
import authenticate from './authenticate'
import player from './player'
import seeds from './seed'
import recommendations from './recommendations'
import navigation from './navigation'
import artists from './artists'
import genres from './genres'

const rootReducer = combineReducers({
  authenticate,
  userTracks,
  seeds,
  recommendations,
  player,
  navigation,
  artists,
  genres
})

export default rootReducer
