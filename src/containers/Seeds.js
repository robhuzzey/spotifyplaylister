import React from 'react'
import { connect } from 'react-redux'

import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { addTracksToPlaylist } from '../actions/getUsersPlaylists'

import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'
import PlaylistControls from '../containers/PlaylistControls'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items,
    playlistId: state.playlists.chosenPlaylistId,
    playlistName: state.playlists.chosenPlaylistName
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    removeSeed: trackId => {
      dispatch(removeSeed(trackId))
    },
    addTracksToPlaylist: (playlistId, tracks) => {
      const uris = tracks.map(track => {
        return track.uri
      })
      dispatch(addTracksToPlaylist(playlistId, uris))
    }
  }
}

const Seeds = props => (
  <div>
    {props.items.length === 0 ?
      (
        <Panel>
          Tracks you have liked will appear here for review before you move on to get suggestions based off them.
        </Panel>
      ) : (
        <div>
          {props.playlistId && <Button onClick={() => props.addTracksToPlaylist(props.playlistId, props.items)}>Add tracks to {props.playlistName}</Button>}
          {props.items.map((track, i) => {
            return (
              <Track track={track} key={i}>
                <div className="controls">
                  <PlayControls track={track} />
                  <SeedControls track={track} />
                </div>
              </Track>
            )
          })}
        </div>
      )
    }
    
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
