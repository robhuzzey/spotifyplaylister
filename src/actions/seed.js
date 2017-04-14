export const ADD_SEED = 'ADD_SEED'
export const REMOVE_SEED = 'REMOVE_SEED'
export const VIEW_SEEDS_TOGGLE = 'VIEW_SEEDS_TOGGLE'

import {
  getRecommendations
} from './recommendations'

export const addSeed = track => {
  return (dispatch, getState, {spotifyApi}) => {

    const seeds = getState().seeds
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

export const viewSeedsToggle = track => {
  return (dispatch, getState, {spotifyApi}) => {
    dispatch({
      type: VIEW_SEEDS_TOGGLE
    })
  }
}
