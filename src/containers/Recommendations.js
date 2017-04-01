import React from 'react'
import { connect } from 'react-redux'

import Tracks from '../components/Tracks.jsx'
import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import { Button } from 'react-bootstrap'

import { getRecommendations } from '../actions/recommendations'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recommendations.items,
    isFetching: state.recommendations.isFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    addSeed: track => {
      dispatch(addSeed(track))
    },
    getRecommendations: () => {
      dispatch(getRecommendations())
    }
  }
}

const Recommendations = props => (
  <Page title="Recommendations">
    <Tracks>
      <div>
        {props.items.length === 0 && 
          <div>
            Once you have added liked tracks, a list of recommendations based off that will appear here.
          </div>
        }
        {props.items.length > 0 && <Button onClick={props.getRecommendations}>Refresh suggestions</Button>}
        {props.items.map((track, i) => {
          return <Track track={track} key={i} />
        })}
      </div>
    </Tracks>
  </Page>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
