import React from 'react'
import { connect } from 'react-redux'

import { getPlaylistTracks } from '../actions/getPlaylistTracks'

import Track from '../components/Track.jsx'
import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

import Loader from '../components/Loader.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.playlistTracks.items,
    isFetching: state.playlistTracks.isFetching,
    totalTracks: state.playlistTracks.total,
    count: state.playlistTracks.count,
    offset: state.playlistTracks.offset,
    limit: state.playlistTracks.limit,
    tracksAllLoaded: state.playlistTracks.allLoaded,
    playlistsAllLoaded: state.playlists.allLoaded,
    chosenPlaylistId: state.playlists.chosenPlaylistId,
    playlistOwnerId: state.playlists.playlistOwnerId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPlaylistTracks: (chosenPlaylistId, playlistOwnerId, offset, limit) => {
      dispatch(getPlaylistTracks(chosenPlaylistId, playlistOwnerId, offset, limit))
    }
  }
}

class PlaylistTracks extends React.Component {

  constructor(props) {
    super(props)
    this.loadMoreTracks = this.loadMoreTracks.bind(this)
  }

  componentDidMount() {
    this.loadMoreTracks()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.chosenPlaylistId !== this.props.chosenPlaylistId) {
      this.loadMoreTracks()
    }
  }

  loadMoreTracks() {
    !this.props.isFetching && !this.props.tracksAllLoaded && this.props.getPlaylistTracks(this.props.chosenPlaylistId, this.props.playlistOwnerId, this.props.offset, this.props.limit)
  }

  render() {
    return (
      <Loader offset={10} onEnter={this.loadMoreTracks}>
        {this.props.items.map((item, i) => {
          return (
            <Track track={item.track} key={i}>
              <div className="controls">
                <PlayControls track={item.track} />
                <SeedControls track={item.track} />
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
)(PlaylistTracks)
