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

class Controls extends React.Component {

  constructor(props) {
    super(props)
    this.getPercentLoaded = this.getPercentLoaded.bind(this)
  }

  getPercentLoaded() {
    if(this.props.count < 1 || this.props.totalTracks < 0) return 0;
    return Math.round((((this.props.count || 1) / (this.props.totalTracks || 1)) * 100));
  }

  render() {
    const percentLoaded = this.getPercentLoaded()
    return (
      <div>
        <ButtonGroup>
          {this.props.tracks.length === 0 && <Button onClick={this.props.getUsersTracks}>Get tracks</Button>}
          {this.props.seeds.length > 0 && <Button onClick={this.props.getRecommendations}>Get suggestions</Button>}
        </ButtonGroup>
        {this.props.isFetching ? (
          <ProgressBar now={percentLoaded} label={`Loading ${this.props.count} of ${this.props.totalTracks} (${percentLoaded}%)`} />
        ) : (
          <div>
            <p>Total tracks: {this.props.totalTracks}</p>
            <p>Total albums: {this.props.totalAlbums}</p>
            <p>Total artists: {this.props.totalArtists}</p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
