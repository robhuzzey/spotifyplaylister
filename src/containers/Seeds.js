import React from 'react'
import { connect } from 'react-redux'
import { getRecommendations } from '../actions'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getRecommendations: () => {
      dispatch(getRecommendations())
    }
  }
}

const Seeds = props => (
  <div>
    {props.items.map((track, i) => {
      return <Track 
          track={track}
          key={i} />
    })}
    {props.items.length > 0 && <button onClick={props.getRecommendations}>Get Suggestions</button>}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
