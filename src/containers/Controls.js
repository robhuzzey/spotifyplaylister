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

const Controls = props => {
  let addToLibrary = <LibraryAddIcon />
  if(props.addingUserTrack === props.track.id) addToLibrary = 'Adding'
  if(props.addingUserTrackFailed === props.track.id) addToLibrary = 'Failed'
  if(props.addedUserTrack === props.track.id) addToLibrary = 'Added'
  const playStop = props.isPlaying ? props.unload : () => props.load(props.track);
  const addRemove = props.isASeed ? () => props.removeSeed(props.track) : () => props.addSeed(props.track);
  return (
    <Track track={props.track} over={props.load} out={props.unload}>
      <IconButton mini={true} onTouchTap={playStop} secondary={props.isPlaying}>
        {props.isPlaying ? <StopIcon /> : <PlayIcon />}
      </IconButton>
      <IconButton mini={true} onTouchTap={addRemove} secondary={props.isASeed}>
        {props.isASeed ? <DeleteIcon /> : <AddIcon />}
      </IconButton>
      <IconButton mini={true} onTouchTap={() => props.addUserTrack(props.track)}>
        {addToLibrary}
      </IconButton>
    </Track>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
