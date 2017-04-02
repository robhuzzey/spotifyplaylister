import React from 'react'
import { connect } from 'react-redux'
import { unloadTrack } from '../actions/player'
import Track from '../components/Track.jsx'
import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.player.track
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    unloadTrack: () => {
      dispatch(unloadTrack())
    }
  }
}

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.audio = null
  }

  componentDidUpdate() {
    if(this.props.track.preview_url) {
      const trackAudio = new Audio(this.props.track.preview_url)
      trackAudio.oncanplay = () => {
        trackAudio.play()
        trackAudio.onended = () => {
          this.props.unloadTrack()
        }
        trackAudio.onerror = () => {
          alert('Audio failed to play')
        }
        this.audio && this.audio.pause()
        this.audio = trackAudio
      }
    } else {
      if(this.audio) {
        this.audio.pause()
        this.audio = null
      }
    }
    
  }
  render() {
    console.log(this.props.track)
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
