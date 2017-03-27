import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, addSeed } from '../actions'
import { Button, ButtonGroup, Panel } from 'react-bootstrap'
import TrackWithControls from '../components/TrackWithControls.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.player.track
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.audio = new Audio()
  }

  componentDidUpdate() {
    this.audio.pause()
    this.audio = new Audio(this.props.track.preview_url)
    this.audio && this.audio.play()
  }
  render() {
    return (
      <Panel>
        <TrackWithControls track={this.props.track} />
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
