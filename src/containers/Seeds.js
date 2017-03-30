import React from 'react'
import { connect } from 'react-redux'

import { getRecommendations } from '../actions/recommendations'
import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'

import { Button } from 'react-bootstrap'

import Track from '../components/Track.jsx'

import RaisedButton from 'material-ui/RaisedButton'

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
    removeSeed: track => {
      dispatch(removeSeed(track))
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
      return (
        <div className="panel-body" key={i}>
          <Track track={track}>
            <RaisedButton label="Delete" fullWidth={true} onTouchTap={() => props.removeSeed(track)} />
          </Track>
        </div>
      )
    })}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
