import React from 'react'
import { connect } from 'react-redux'


import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'


import { Button, ProgressBar } from 'react-bootstrap';

import Tracks from '../components/Tracks.jsx'
import Track from '../components/Track.jsx'

import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'


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

class UserTracks extends React.Component {
  componentDidMount() {
    this.props.tracks.length === 0 && this.props.getUsersTracks()
  }
  render() {
    if(this.props.isFetching) {
      return <ProgressBar now={this.props.count} max={this.props.totalTracks} label={`Loading ${this.props.count} of ${this.props.totalTracks}`} />
    }
    return (
      <Page title="Users tracks">
        <Tracks>
          {this.props.tracks.map((track, i) => {
            return (
              <Track track={track} key={i}>
                <PlayControls track={track} />
                <SeedControls track={track} />
              </Track>
            )
          })}
        </Tracks>
      </Page>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
