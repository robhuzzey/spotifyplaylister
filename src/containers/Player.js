import React from 'react'
import { connect } from 'react-redux'
import { loadTrack, unloadTrack } from '../actions'
import { Button, ButtonGroup, ProgressBar } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
  return {
    src: state.player.src
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => {
      dispatch(loadTrack())
    },
    unload: () => {
      dispatch(unloadTrack())
    }
  }
}

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.audioEl = null
  }

  render() {
    return (
      <div>
        <p>Playing: {this.props.name}</p>
        <button onClick={this.props.unload}>Stop</button>
        <audio autoPlay src={this.props.src} ref={ref => {this.audioEl = ref}}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
