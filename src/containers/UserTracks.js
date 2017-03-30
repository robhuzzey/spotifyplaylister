import React from 'react'
import { connect } from 'react-redux'


import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'


import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'

import TrackWithControls from '../components/TrackWithControls.jsx'

import LazyLoad from 'react-lazyload'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.userTracks.items,
    isFetching: state.userTracks.isFetching,
    totalTracks: state.userTracks.total,
    count: state.userTracks.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersTracks: () => {
      dispatch(getUsersTracks())
    },
    addSeed: track => {
      dispatch(addSeed(track))
    },
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    }
  }
}

const UserTracks = props => (
  <div>
    
    {props.tracks.length === 0 && <RaisedButton label="Get Tracks (probably want this automaticly happening)" fullWidth={true} onClick={props.getUsersTracks} />}
    {props.isFetching ? (
      <LinearProgress mode="determinate" value={props.count} max={props.totalTracks} />
    ) : (
      <div>
        {props.tracks.map((track, i) => {
          return (
            <LazyLoad height={100} offset={100} key={i}>
              <TrackWithControls track={track} />
            </LazyLoad>
          )
        })}
      </div>
    )}
    
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
