import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, addSeed, removeSeed, addUserTrack } from '../actions'
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    isASeed: !!state.seeds.items.filter(seed => seed.id === ownProps.track.id).length,
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
    addSeed: track => {
      dispatch(addSeed(track))
    },
    removeSeed: track => {
      dispatch(removeSeed(track))
    },
    addUserTrack: track => {
      dispatch(addUserTrack(track))
    }
  }
}

const Controls = props => {
  let addTrackText = props.addingUserTrack === props.track.id ? 'Adding track' : <span>Add track <Glyphicon glyph="plus" /></span>
  if(props.addingUserTrackFailed === props.track.id) addTrackText = <span>Failed <Glyphicon glyph="remove" /></span>
  if(props.addedUserTrack === props.track.id) addTrackText = <span>Added <Glyphicon glyph="ok" /></span>
  return (
    <ButtonGroup>
      {props.isPlaying ? (
        <Button bsStyle="primary" onClick={props.unload}>Stop <Glyphicon glyph="stop" /></Button>
      ) : (
        <Button bsStyle="info" onClick={() => props.load(props.track)}>Play <Glyphicon glyph="play" /></Button>
      )}
      {props.isASeed ? (
        <Button bsStyle="danger" onClick={() => props.removeSeed(props.track)}>Remove Seed <Glyphicon glyph="trash" /></Button>
      ) : (
        <Button bsStyle="success" onClick={() => props.addSeed(props.track)}>Add Seed <Glyphicon glyph="plus" /></Button>
      )}

      <Button bsStyle="default" onClick={() => props.addUserTrack(props.track)}>{addTrackText}</Button>
    </ButtonGroup>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
