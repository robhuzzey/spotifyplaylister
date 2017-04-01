import React from 'react'
import { connect } from 'react-redux'
import { addSeed } from '../actions/seed'
import { loadTrack, unloadTrack } from '../actions/player'
import { Button } from 'react-bootstrap'
import Track from '../components/Track.jsx'
import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

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
    if(!this.audio) return
    this.audio.pause()
    // this.audio = new Audio(this.props.track.preview_url)
    this.audio.src = this.props.track.preview_url || ''
    this.audio.play()
  }
  render() {
    return (
      <div>
        {this.props.track.name && (
          <Track track={this.props.track}>
            <PlayControls track={this.props.track} />
            <SeedControls track={this.props.track} />
          </Track>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
