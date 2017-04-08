import React from 'react'
import { connect } from 'react-redux'

import { loadTrack, unloadTrack } from '../actions/player'
import { addUserTrack } from '../actions/addUserTrack'

import { Button, Glyphicon } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    isThisTrack: ownProps.track.id === state.player.track.id,
    isLoaded: state.player.isLoaded,
    addingUserTrack: state.userTracks.addingUserTrack,
    addedUserTrack: state.userTracks.addedUserTrack,
    addingUserTrackFailed: state.userTracks.addingUserTrackFailed
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: track => {
      dispatch(loadTrack(track))
    },
    unload: () => {
      dispatch(unloadTrack())
    },
    addUserTrack: track => {
      dispatch(addUserTrack(track))
    }
  }
}

const PlayControls = props => {
  return props.isThisTrack ? (
    props.isLoaded ? (
      <Button bsStyle="danger" onClick={props.unload}><Glyphicon glyph="stop" /></Button>
    ) : (
      <Button bsStyle="warning" onClick={props.unload}><Glyphicon glyph="hourglass" /></Button>
    )
  ) : (
    <Button bsStyle="success" onClick={() => props.load(props.track)}><Glyphicon glyph="play" /></Button>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayControls)
