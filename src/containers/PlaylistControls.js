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
    <span>
      {props.savedUserTrack === props.track.id ? (
        <Glyphicon glyph="saved" />
      ) : (
        <Button bsStyle="default" bsSize="large" onClick={() => props.addUserTrack(props.track)}>
          {props.addingUserTrack === props.track.id ? (
            <Glyphicon glyph="hourglass" />
          ) : (
            <Glyphicon glyph="plus" />
          )}
        </Button>
      )}
    </span>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistControls)
