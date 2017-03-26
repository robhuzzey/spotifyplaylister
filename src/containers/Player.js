import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, playingProgress } from '../actions'
import { Button, ButtonGroup, ProgressBar, Panel } from 'react-bootstrap'
import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.player.track,
    currentTime: state.player.currentTime,
    totalTime: state.player.totalTime
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
    updatePlayingProgress: (currentTime, total) => {
      dispatch(playingProgress(currentTime, total))
    }
  }
}

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.audioEl = null
  }

  componentDidMount() {
    const audio = this.audioEl
    audio.addEventListener('timeupdate', (e) => {
      this.props.updatePlayingProgress(audio.currentTime, 30)
    })
  }

  render() {
    const  {
      track
    } = this.props
    return (
      <Panel>
        <Track track={track} />
        <ProgressBar now={this.props.currentTime} max={this.props.totalTime} label='Playing...' />
        <button onClick={this.props.unload}>Stop</button>
        <audio autoPlay src={track.preview_url || ''} ref={ref => {this.audioEl = ref}}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
