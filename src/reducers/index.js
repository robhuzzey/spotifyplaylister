import { combineReducers } from 'redux'

import albums from './albums'
import userTracks from './userTracks'
import authenticate from './authenticate'
import player from './player'
import seeds from './seed'
import recommendations from './recommendations'

const rootReducer = combineReducers({
  albums,
  authenticate,
  userTracks,
  seeds,
  recommendations,
  player
})

export default rootReducer
