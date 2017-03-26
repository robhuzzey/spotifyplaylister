import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, addSeed } from '../actions'
import { Button, ButtonGroup, Panel } from 'react-bootstrap'
import Track from '../components/Track.jsx'
import Controls from './Controls'

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.player.track
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => {
      dispatch(loadTrack())
    },
    unload: () => {
      dispatch(unloadTrack())
    },
    addSeed: track => {
      dispatch(addSeed(track))
    }
  }
}

const Player = props => (
  <Panel>
    <Track track={props.track}>
      <Controls track={props.track} />
    </Track>
    <audio autoPlay src={props.track.preview_url || ''}>
      Your browser does not support the <code>audio</code> element.
    </audio>
  </Panel>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
