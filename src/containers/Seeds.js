import React from 'react'
import { connect } from 'react-redux'

import { loadTrack, removeSeed } from '../actions'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    removeSeed: trackId => {
      dispatch(removeSeed(trackId))
    }
  }
}

const Seeds = props => (
  <div>
    <h2>Seeds</h2>
    {props.items.map((track, i) => {
      return <Track 
          track={track}
          key={i}
          removeSeed={props.removeSeed.bind(null, track.id)}
          play={props.play} />
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
