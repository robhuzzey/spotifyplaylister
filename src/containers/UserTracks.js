import React from 'react'
import { connect } from 'react-redux'
import { addSeed, getUsersTracks, loadTrack } from '../actions'
import { Button, ProgressBar } from 'react-bootstrap';

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
    {props.tracks.length === 0 && <Button onClick={props.getUsersTracks}>Get tracks</Button>}
    {props.isFetching ? (
      <ProgressBar now={props.count} max={props.totalTracks} label={`Loading ${props.count} of ${props.totalTracks}`} />
    ) : (
      <div>
        {props.tracks.map((track, i) => {
          return (
            <LazyLoad height={100} key={i}>
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
