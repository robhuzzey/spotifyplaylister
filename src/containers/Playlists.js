import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { createPlaylist, getUsersPlaylists, choosePlaylist } from '../actions/getUsersPlaylists'

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
    playlistOwnerId: state.playlists.playlistOwnerId,
    newPlaylist: state.playlists.newPlaylist
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersPlaylists: (offset, limit) => {
      dispatch(getUsersPlaylists(offset, limit))
    },
    choosePlaylist: (playlist) => {
      dispatch(choosePlaylist(playlist.value, playlist.label))
    },
    createPlaylist: playlistName => {
      dispatch(createPlaylist(playlistName))
    }
  }
}

class Playlists extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchInputText: ''
    }
    this.updateInputText = this.updateInputText.bind(this)
  }

  updateInputText(searchInputText) {
    this.setState({
      searchInputText
    })
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
        <Select
          clearable={false}
          value={this.props.chosenPlaylistId}
          options={this.props.playlists.map(playlist => {
            return {
              value: playlist.id,
              label: playlist.name
            }
          })}
          onChange={this.props.choosePlaylist}
          onInputChange={this.updateInputText}
          noResultsText={<Button onClick={() => this.props.createPlaylist(this.state.searchInputText)}>Create playlist {this.state.searchInputText}</Button>}
        />

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
