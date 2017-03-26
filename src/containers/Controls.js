import React from 'react'
import { connect } from 'react-redux'
import { addSeed, removeSeed, getUsersTracks, getRecommendations } from '../actions'
import { Button, ButtonGroup, ProgressBar } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.userTracks.items,
    seeds: state.seeds.items,
    isFetching: state.userTracks.isFetching,
    totalTracks: state.userTracks.total,
    totalAlbums: state.albums.total,
    totalArtists: state.artists.total,
    count: state.userTracks.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRecommendations: () => {
      dispatch(getRecommendations())
    },
    getUsersTracks: () => {
      dispatch(getUsersTracks())
    }
  }
}

const Controls = props => (
  <div>
    <ButtonGroup>
      {props.tracks.length === 0 && <Button onClick={props.getUsersTracks}>Get tracks</Button>}
      {props.seeds.length > 0 && <Button onClick={props.getRecommendations}>Get suggestions</Button>}
    </ButtonGroup>
    {props.isFetching ? (
      <ProgressBar now={props.count} max={props.totalTracks} label={`Loading ${props.count} of ${props.totalTracks}`} />
    ) : (
      <div>
        <p>Total tracks: {props.totalTracks}</p>
        <p>Total albums: {props.totalAlbums}</p>
        <p>Total artists: {props.totalArtists}</p>
      </div>
    )}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
