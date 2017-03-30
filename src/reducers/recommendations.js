import {
  REQUEST_RECOMMENDATIONS,
  RECEIVE_RECOMMENDATIONS
} from '../actions/recommendations'

const recommendations = (state = {
  items: [],
  isLoading: false
}, action) => {
  switch (action.type) {
    case REQUEST_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_RECOMMENDATIONS:
      return Object.assign({}, state, {
        isLoading: false,
        items: action.data.body.tracks
      })
    default:
      return state
  }

}

export default recommendations
