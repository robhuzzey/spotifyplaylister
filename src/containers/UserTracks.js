import React from 'react'
import { connect } from 'react-redux'

import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'

import { Button, ButtonGroup, ProgressBar, Badge, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'
import Loader from '../components/Loader.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.userTracks.items,
    isFetching: state.userTracks.isFetching,
    totalTracks: state.userTracks.total,
    count: state.userTracks.count,
    offset: state.userTracks.offset,
    limit: state.userTracks.limit,
    allLoaded: state.userTracks.allLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersTracks: (offset, limit) => {
      dispatch(getUsersTracks(offset, limit))
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

  constructor(props) {
    super(props)
    this.loadMoreTracks = this.loadMoreTracks.bind(this)
  }

  componentDidMount() {
    this.loadMoreTracks()
  }

  loadMoreTracks() {
    !this.props.isFetching && !this.props.allLoaded && this.props.getUsersTracks(this.props.offset, this.props.limit)
  }

  render() {
    return (
      <Loader offset={10} onEnter={this.loadMoreTracks}>
        {this.props.tracks.map((track, i) => {
          return (
            <Track track={track} key={i}>
              <div className="controls">
                <PlayControls track={track} />
                <SeedControls track={track} />
              </div>
            </Track>
          )
        })}
      </Loader>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
