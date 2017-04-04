import React from 'react'
import { connect } from 'react-redux'


import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'
import { addGenre, removeGenre } from '../actions/genre'

import { Button, ProgressBar, Badge } from 'react-bootstrap';
import Select from 'react-select'
import 'react-select/dist/react-select.css'

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
    count: state.userTracks.count,
    genresLoading: state.genres.loading,
    genre: state.genres.genre,
    genres: state.genres.all
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
    },
    addGenre: genre => {
      dispatch(addGenre(genre))
    },
    removeGenre: () => {
      dispatch(removeGenre())
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
        <Select
          placeholder={this.props.genresLoading ? 'Loading...' : 'Please Select'}
          value={this.props.genre}
          options={this.props.genres.map(genre => {
            return {
              label: `${genre.name} ${genre.count}`,
              value: genre.name
            }
          })}
          onChange={option => option && option.value ? this.props.addGenre(option.value) : this.props.removeGenre()} />
        <Tracks>
          {this.props.tracks.filter(track => {
            if(this.props.genre) {
              return track.genres.indexOf(this.props.genre) !== -1
            }
            // return track
          }).map((track, i) => {
            return (
              <Track track={track} key={i}>
                <PlayControls track={track} />
                <SeedControls track={track} />
                <p>Genres: {this.props.genresLoading && '...loading'}{(track.genres || []).map((genre, i) => {
                  return <Badge key={i}>{genre} {this.props.genre === genre && 'x'}</Badge>
                })}</p>
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
