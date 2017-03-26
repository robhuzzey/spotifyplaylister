import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'

import { Button } from 'react-bootstrap';

import { loadTrack, addSeed, getRecommendations } from '../actions'

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
    addSeed: trackId => {
      dispatch(addSeed(trackId))
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
      return (
        <Track 
          track={track} 
          key={i} 
          play={props.play}
          addSeed={props.addSeed.bind(null, track.id)} />
      )
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
