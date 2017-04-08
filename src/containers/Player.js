import React from 'react'
import { connect } from 'react-redux'
import { unloadTrack, trackLoaded } from '../actions/player'
import Track from '../components/Track.jsx'
import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'
import { ButtonGroup } from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.player.track
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    unloadTrack: () => {
      dispatch(unloadTrack())
    },
    trackLoaded: () => {
      dispatch(trackLoaded())
    }
  }
}

class Player extends React.Component {

  constructor(props) {
    super(props)
    this.audio = null
    this.initAudio = this.initAudio.bind(this)
    this.onCanPlay = this.onCanPlay.bind(this)
  }

  componentDidMount() {
    this.audio = new Audio()
  }

  initAudio(src) {
    // A lot of jumpping through hoops for HTML5 on IOS :(
    this.audio.src = src
    this.audio.play() //start loading, didn't used `this.audio.load()` since it causes problems with the `ended` event
    if(this.audio.readyState !== 4){ //HAVE_ENOUGH_DATA
      this.audio.addEventListener('canplay', this.onCanPlay, false)
      this.audio.addEventListener('load', this.onCanPlay, false) //add load event as well to avoid errors, sometimes 'canplaythrough' won't dispatch.
    }
  }

  onCanPlay() {
    this.audio.removeEventListener('canplay', this.onCanPlay, false)
    this.audio.removeEventListener('load', this.onCanPlay, false)
    //video is ready
    this.props.trackLoaded()
    this.audio.play()
  }

  componentDidUpdate() {
    if(this.props.track.preview_url) {
      this.initAudio(this.props.track.preview_url)      
    } else {
      this.audio.pause()
      this.audio.url = null
    }
  }

  render() {
    console.log(this.props.track)
    return (
      <div>
        {this.props.track.name && (
          <Track track={this.props.track}>
            <ButtonGroup bsSize="large">
              <PlayControls track={this.props.track} />
              <SeedControls track={this.props.track} />
            </ButtonGroup>
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
