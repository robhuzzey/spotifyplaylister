import React from 'react'
import { connect } from 'react-redux'

import { loadTrack } from '../actions'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    }
  }
}

const Seeds = props => (
  <div>
    {props.items.map((track, i) => {
      return <Track 
          track={track}
          key={i}
          play={props.play} />
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
