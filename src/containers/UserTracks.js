import React from 'react'
import { connect } from 'react-redux'
import { addSeed, removeSeed, getUsersTracks } from '../actions'

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
    removeSeed: trackId => {
      dispatch(removeSeed(trackId))
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
              isASeed={this.isASeed(track.id)}
              addSeed={this.props.addSeed.bind(null, track.id)}
              removeSeed={this.props.removeSeed.bind(null, track.id)}
              key={i} />
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
