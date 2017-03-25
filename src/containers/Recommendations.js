import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.recommendations.items,
    isFetching: state.recommendations.isFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Recommendations = props => (
  <div>
    {props.isFetching && <p>Fetching tracks</p>}
    {props.tracks.map((track, i) => {
      return (
        <Track track={track} key={i} />
      )
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
