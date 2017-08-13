import React from 'react'
import { connect } from 'react-redux'

import { loadTrack, unloadTrack } from '../actions/player'
import { addUserTrack } from '../actions/addUserTrack'
import GlyphText from '../components/GlyphText.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    isThisTrack: ownProps.track.id === state.player.track.id,
    isLoaded: state.player.isLoaded,
    addingUserTrack: state.userTracks.addingUserTrack,
    addedUserTrack: state.userTracks.addedUserTrack,
    addingUserTrackFailed: state.userTracks.addingUserTrackFailed,
    isPlayable: ownProps.track.preview_url
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
  if(!props.isPlayable) return (
    <GlyphText glyph="ban-circle" text="No Preview" />
  )
  return props.isThisTrack ? (
    props.isLoaded ? (
      <GlyphText glyph="stop" onClick={props.unload} text="Stop" active />
    ) : (
      <GlyphText glyph="refresh" onClick={props.unload} text="Loading" />
    )
  ) : (
    <GlyphText glyph="play" onClick={() => props.load(props.track)} text="Play" />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayControls)
