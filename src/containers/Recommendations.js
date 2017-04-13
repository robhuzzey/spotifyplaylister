import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'
import PlaylistControls from '../containers/PlaylistControls'

import { Badge, Button, ButtonGroup, Panel } from 'react-bootstrap'

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
  <div>
    {props.items.length > 0 && <p><Button onClick={props.getRecommendations}>Refresh suggestions</Button></p>}
    <div>
      {props.items.length === 0 && 
        <Panel>
          Once you have added liked tracks, a list of recommendations based off that will appear here.
        </Panel>
      }
      {props.items.map((track, i) => {
        return (
          <Track track={track} key={i}>
            <ButtonGroup bsSize="large" justified>
              <ButtonGroup>
                <PlayControls track={track} />
              </ButtonGroup>
              <ButtonGroup>
                <SeedControls track={track} />
              </ButtonGroup>
              <ButtonGroup>
                <PlaylistControls track={track} />
              </ButtonGroup>
            </ButtonGroup>
          </Track>
        )
      })}
    </div>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
