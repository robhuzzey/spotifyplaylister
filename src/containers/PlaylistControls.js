import React from 'react'
import { connect } from 'react-redux'

import { addUserTrack } from '../actions/addUserTrack'

import { Button, Glyphicon } from 'react-bootstrap'

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
  return (
    <Button bsStyle="default" onClick={() => props.addUserTrack(props.track)}>
      {props.addingUserTrack === props.track.id ? (
        <Glyphicon glyph="hourglass" />
      ) : (
        props.savedUserTrack === props.track.id ? (
          <Glyphicon glyph="saved" />
        ) : (
          <Glyphicon glyph="plus" />
        )
      )}
    </Button>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistControls)
