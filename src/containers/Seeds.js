import React from 'react'
import { connect } from 'react-redux'

import { getRecommendations } from '../actions/recommendations'
import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'

import { Button } from 'react-bootstrap';

import Tracks from '../components/Tracks.jsx'
import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

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
  <Page title="Seeds">
    <Tracks>
      <div>
        {props.items.length === 0 && 
          <div>
            Tracks you have liked will appear here for review before you move on to get suggestions based off them.
          </div>
        }
        {props.items.map((track, i) => {
          return (
            <Track track={track} key={i}>
              <PlayControls track={track} />
              <SeedControls track={track} />
            </Track>
          )
        })}
      </div>
    </Tracks>
  </Page>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
