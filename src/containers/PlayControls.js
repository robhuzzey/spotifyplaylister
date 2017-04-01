import React from 'react'
import { connect } from 'react-redux'

import { loadTrack, unloadTrack } from '../actions/player'
import { addUserTrack } from '../actions/addUserTrack'

import { Button, Glyphicon } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    isPlaying: ownProps.track.id === state.player.track.id,
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
  let addTrackText = props.addingUserTrack === props.track.id ? 'Adding track' : <span>Add track <Glyphicon glyph="plus" /></span>
  if(props.addingUserTrackFailed === props.track.id) addTrackText = <span>Failed <Glyphicon glyph="remove" /></span>
  if(props.addedUserTrack === props.track.id) addTrackText = <span>Added <Glyphicon glyph="ok" /></span>
  return (
    <span>
      {props.isPlaying ? (
        <Button bsStyle="default" onClick={props.unload}><Glyphicon glyph="stop" /></Button>
      ) : (
        <Button bsStyle="default" onClick={() => props.load(props.track)}><Glyphicon glyph="play" /></Button>
      )}
    </span>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayControls)
