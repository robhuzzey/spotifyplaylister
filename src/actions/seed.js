export const ADD_SEED = 'ADD_SEED'
export const REMOVE_SEED = 'REMOVE_SEED'

import {
  getRecommendations
} from './recommendations'

export const addSeed = track => {
  return (dispatch, getState, {spotifyApi}) => {

    const seeds = getState().seeds
    if(seeds.count === 5) {
      dispatch(getRecommendations())
    } 

    dispatch({
      type: ADD_SEED,
      track: track
    })
  }
}

export const removeSeed = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: REMOVE_SEED,
      track
    })
  }
}
