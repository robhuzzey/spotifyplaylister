import React from 'react'
import { connect } from 'react-redux'

import { addUserTrack } from '../actions/addUserTrack'

import GlyphText from '../components/GlyphText.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    addingUserTrack: state.userTracks.addingUserTrack,
    savedUserTrack: state.userTracks.addedUserTrack
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addUserTrack: track => {
      dispatch(addUserTrack(track))
    }
  }
}

const PlaylistControls = props => {
  const glyph = props.savedUserTrack === props.track.id ? 'saved' : 'plus'
  const loading = props.addingUserTrack === props.track.id ? 'hourglass' : glyph
  return (
    <GlyphText glyph={loading} onClick={() => props.addUserTrack(props.track)} text="Add to tracks" />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistControls)
