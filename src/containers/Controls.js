import React from 'react'
import { connect } from 'react-redux'

import { addSeed, removeSeed } from '../actions/seed'
import { loadTrack, unloadTrack } from '../actions/player'
import { addUserTrack } from '../actions/addUserTrack'

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap'

import Track from '../components/Track.jsx'

import IconButton from 'material-ui/IconButton'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import StopIcon from 'material-ui/svg-icons/av/stop'
import AddIcon from 'material-ui/svg-icons/action/note-add'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import LibraryAddIcon from 'material-ui/svg-icons/av/library-add'

// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'


const mapStateToProps = (state, ownProps) => {
  return {
    isASeed: !!state.seeds.items.filter(seed => seed.id === ownProps.track.id).length,
    isPlaying: ownProps.track.id === state.player.track.id,
    addingUserTrack: state.userTracks.addingUserTrack,
    addedUserTrack: state.userTracks.addedUserTrack,
    addingUserTrackFailed: state.userTracks.addingUserTrackFailed
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: track => {
      dispatch(loadTrack(track))
    },
    unload: () => {
      dispatch(unloadTrack())
    },
    addSeed: track => {
      dispatch(addSeed(track))
    },
    removeSeed: track => {
      dispatch(removeSeed(track))
    },
    addUserTrack: track => {
      dispatch(addUserTrack(track))
    }
  }
}

class Controls extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleSlideChange = this.handleSlideChange.bind(this)
    this.state = {
      slideIndex: 0
    }
  }

  handleSlideChange(slideIndex) {
    this.setState({
      slideIndex
    })
  }

  render() {
    let addToLibrary = <LibraryAddIcon />
    if(this.props.addingUserTrack === this.props.track.id) addToLibrary = 'Adding'
    if(this.props.addingUserTrackFailed === this.props.track.id) addToLibrary = 'Failed'
    if(this.props.addedUserTrack === this.props.track.id) addToLibrary = 'Added'
    const playStop = () => {
      this.handleSlideChange(0)
      this.props.isPlaying ? this.props.unload() : this.props.load(this.props.track);
    }
    const addRemove = this.props.isASeed ? () => this.props.removeSeed(this.props.track) : () => this.props.addSeed(this.props.track);
    return (
      <div className="media">
        <div className="media-left" onTouchTap={playStop}>
          <img className="media-object" alt="album art" width={64} height={64} src={this.props.track && this.props.track.album && (this.props.track.album.images[2] || this.props.track.album.images[1] || this.props.track.album.images[0]).url} />
        </div>
        <div className="media-body">
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideChange}
            enableMouseEvents={true}>
            <h4 className="media-heading" onTouchTap={playStop}>
              <IconButton mini={true}secondary={this.props.isPlaying}>
                {this.props.isPlaying ? <StopIcon /> : <PlayIcon />}
              </IconButton>
              {this.props.track.name}<br /><small>{(this.props.track.artists || []).map(artist => artist.name).join(' / ')}</small>
            </h4>
            <div>
              <IconButton mini={true} onTouchTap={addRemove} secondary={this.props.isASeed}>
                {this.props.isASeed ? <DeleteIcon /> : <AddIcon />}
              </IconButton>
              <IconButton mini={true} onTouchTap={() => this.props.addUserTrack(props.track)}>
                {addToLibrary}
              </IconButton>
            </div>
          </SwipeableViews>
          
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
