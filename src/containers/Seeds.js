import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Seeds = props => (
  <div>
    {props.items.map((track, i) => {
      return <Track 
          track={track}
          key={i} />
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
