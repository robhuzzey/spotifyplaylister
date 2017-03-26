import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, addSeed, removeSeed } from '../actions'
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    isASeed: !!state.seeds.items.filter(seed => seed.id === ownProps.track.id).length,
    isPlaying: ownProps.track.id === state.player.track.id
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
    }
  }
}

const Controls = props => (
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
  </ButtonGroup>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
