import React from 'react'
import { connect } from 'react-redux'

import TrackWithControls from '../components/TrackWithControls.jsx'

import { Button } from 'react-bootstrap'

import { getRecommendations } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recommendations.items,
    isFetching: state.recommendations.isFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    addSeed: track => {
      dispatch(addSeed(track))
    },
    getRecommendations: () => {
      dispatch(getRecommendations())
    }
  }
}

const Recommendations = props => (
  <div>
    {props.items.length > 0 && <Button onClick={props.getRecommendations}>Refresh suggestions</Button>}
    {props.items.map((track, i) => {
      return <TrackWithControls track={track} key={i} />
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
