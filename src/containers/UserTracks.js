import React from 'react'
import { connect } from 'react-redux'
import Infinite from 'react-infinite'

import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'
import { addGenre, removeGenre, toggleList } from '../actions/genre'

import { Button, ButtonGroup, ProgressBar, Badge, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

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
    genres: state.genres.all,
    listGenres: state.genres.showList
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
    },
    toggleGenreList: () => {
      dispatch(toggleList())
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
      <div>
        <p><Button onClick={this.props.toggleGenreList}>Filter by: </Button> : {this.props.genre}</p>
        <Panel collapsible expanded={this.props.listGenres}>
          <ListGroup>
            <ListGroupItem bsStyle="danger" onClick={() => this.props.removeGenre()}>Clear</ListGroupItem>
            {this.props.genres.map((genre, i) => {
              return <ListGroupItem key={i} bsStyle={genre === this.props.genre ? "success" : "info"} onClick={() => genre === this.props.genre ? this.props.removeGenre() : this.props.addGenre(genre.name)}>{genre.name} <Badge>{genre.count}</Badge></ListGroupItem>
            })}
          </ListGroup>
        </Panel>
        <Tracks>
          <Infinite useWindowAsScrollContainer elementHeight={100}>
            {this.props.tracks.filter(track => {
              if(this.props.genre) {
                return track.genres.indexOf(this.props.genre) !== -1
              }
              return track
            }).map((track, i) => {
              return (
                <Track track={track} key={i}>
                  <ButtonGroup bsSize="large">
                    <PlayControls track={track} />
                    <SeedControls track={track} />
                  </ButtonGroup>
                  {/*<p>Genres: {this.props.genresLoading && '...loading'}{(track.genres || []).map((genre, i) => {
                    return <Badge key={i}>{genre} {this.props.genre === genre && 'x'}</Badge>
                  })}</p>*/}
                </Track>
              )
            })}
          </Infinite>
        </Tracks>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
