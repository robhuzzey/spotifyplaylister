import React from 'react'
import { connect } from 'react-redux'
import { addSeed, getUsersTracks } from '../actions'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.userTracks.items,
    totalTracks: state.userTracks.total,
    albums: state.albums.items,
    totalAlbums: state.albums.total,
    artists: state.artists.items,
    totalArtists: state.artists.total,
    isFetching: state.userTracks.isFetching,
    seedIds: state.seeds.ids
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersTracks: () => {
      dispatch(getUsersTracks())
    },
    seed: trackId => {
      dispatch(addSeed(trackId))
    }
  }
}

const UserTracks = props => (
  <div>
    {props.isFetching && <p>Fetching tracks</p>}
    <p>Total tracks: {props.totalTracks}</p>
    <p>Total albums: {props.totalAlbums}</p>
    <p>Total artists: {props.totalArtists}</p>
    {props.tracks.map((track, i) => {
      return (
        <Track 
          track={track.track}
          seed={props.seed.bind(null, track.track.id)}
          key={i} />
      )
    })}
    <button onClick={props.getUsersTracks}>Get tracks</button>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
