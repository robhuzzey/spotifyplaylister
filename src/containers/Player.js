import React from 'react'
import { connect } from 'react-redux'
import { addSeed } from '../actions/seed'
import { loadTrack, unloadTrack } from '../actions/player'
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
      <div>
        <h1>Spotify Playlister</h1>
        <TrackWithControls track={this.props.track} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
