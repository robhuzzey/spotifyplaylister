import React from 'react'
import { connect } from 'react-redux'

import { getRecommendations } from '../actions/recommendations'
import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'

import { Button } from 'react-bootstrap';

import TrackWithControls from '../components/TrackWithControls.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
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
    getRecommendations: () => {
      dispatch(getRecommendations())
    }
  }
}

const Seeds = props => (
  <div>
    {props.items.length > 0 && <Button onClick={props.getRecommendations}>Get suggestions</Button>}
    {props.items.map((track, i) => {
      const divider = i >= 4 ? (
        <div>
          <hr />
          <p>Only those above this line are considered as seeds when recommending tracks</p>
        </div>
      ) : ''
      return (
        <div key={i}>
          <TrackWithControls track={track} />
          {divider}
        </div>
      )
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
