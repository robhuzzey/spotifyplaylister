import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack, playingProgress } from '../actions'
import { Button, ButtonGroup, ProgressBar, Panel } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
  return {
    src: state.player.src,
    name: state.player.name,
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
    return (
      <Panel>
        <p>Playing: {this.props.name}</p>
        <ProgressBar now={this.props.currentTime} max={this.props.totalTime} label='Playing...' />
        <button onClick={this.props.unload}>Stop</button>
        <audio autoPlay src={this.props.src} ref={ref => {this.audioEl = ref}}>
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
