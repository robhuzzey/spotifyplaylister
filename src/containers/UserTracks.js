import React from 'react'
import { connect } from 'react-redux'
import { addSeed, getUsersTracks, loadTrack } from '../actions'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.userTracks.items,
    seedIds: state.seeds.items.map(seed => seed.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsersTracks: () => {
      dispatch(getUsersTracks())
    },
    addSeed: trackId => {
      dispatch(addSeed(trackId))
    },
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    }
  }
}

class UserTracks extends React.Component {

  constructor(props) {
    super(props)
    this.isASeed = this.isASeed.bind(this)
  }

  isASeed(trackId) {
    return (this.props.seedIds.indexOf(trackId) !== -1)
  }

  render() {
    return (
      <div>
        {this.props.tracks.map((track, i) => {
          return (
            <Track 
              track={track}
              addSeed={!this.isASeed(track.id) && this.props.addSeed.bind(null, track.id)}
              key={i}
              play={this.props.play} />
          )
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
