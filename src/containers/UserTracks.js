import React from 'react'
import { connect } from 'react-redux'


import { addSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'
import { getUsersTracks } from '../actions/getUsersTracks'

import LinearProgress from 'material-ui/LinearProgress'
import Divider from 'material-ui/Divider'

import TrackWithControls from '../components/TrackWithControls.jsx'

import LazyLoad from 'react-lazyload'

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
    this.props.getUsersTracks()
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <LinearProgress mode="determinate" value={this.props.count} max={this.props.totalTracks} />
        ) : (
          <div>
            {this.props.tracks.map((track, i) => {
              return (
                <LazyLoad height={100} offset={100} key={i}>
                  <div>
                    <div className="panel-body">
                      <TrackWithControls track={track} />
                    </div>
                    <Divider />
                  </div>
                </LazyLoad>
              )
            })}
          </div>
        )}
        
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTracks)
