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
  return (
    <span>
      {props.isThisTrack ? (
        <span>
          {props.isLoaded ? (
            <Button bsStyle="default" bsSize="large" onClick={props.unload}><Glyphicon glyph="stop" /></Button>
          ) : (
            <Button bsStyle="default" bsSize="large" onClick={props.unload}><Glyphicon glyph="hourglass" /></Button>
          )}
        </span>
      ) : (
        <Button bsStyle="default" bsSize="large" onClick={() => props.load(props.track)}><Glyphicon glyph="play" /></Button>
      )}
    </span>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayControls)
