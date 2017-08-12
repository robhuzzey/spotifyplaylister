import React from 'react'
import { connect } from 'react-redux'

import { getUsersPlaylists, choosePlaylist } from '../actions/getUsersPlaylists'

import { FormControl } from 'react-bootstrap'

import PlaylistTracks from './PlaylistTracks'

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: state.playlists.items,
    isFetching: state.playlists.isFetching,
    totalTracks: state.playlists.total,
    count: state.playlists.count,
    offset: state.playlists.offset,
    limit: state.playlists.limit,
    allLoaded: state.playlists.allLoaded,
    chosenPlaylistId: state.playlists.chosenPlaylistId,
    playlistOwnerId: state.playlists.playlistOwnerId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersPlaylists: (offset, limit) => {
      dispatch(getUsersPlaylists(offset, limit))
    },
    choosePlaylist: (playlistId) => {
      dispatch(choosePlaylist(playlistId))
    }
  }
}

class Playlists extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUsersPlaylists(this.props.offset, this.props.limit)
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.props.allLoaded) {
      this.props.getUsersPlaylists(this.props.offset, this.props.limit)
    }
  }

  render() {
    return (
      <div>
        <FormControl value={this.props.chosenPlaylistId || ''} componentClass='select' placeholder='select' onChange={(e) => this.props.choosePlaylist(e.target.value)}>
          <option value=''>select</option>
          {this.props.playlists.map((playlist, i) => {
            return (
              <option key={i} value={playlist.id}>{playlist.name}</option>
            )
          })}
        </FormControl>
        {this.props.allLoaded && this.props.chosenPlaylistId && this.props.playlistOwnerId && (
          <PlaylistTracks />
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists)
