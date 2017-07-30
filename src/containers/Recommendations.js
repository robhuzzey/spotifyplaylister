import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'
import Loader from '../components/Loader.jsx'
import TrackDetails from '../components/TrackDetails.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'

import { Badge, Button, ButtonGroup, Panel, Glyphicon } from 'react-bootstrap'
import GlyphText from '../components/GlyphText.jsx'

import { getRecommendations } from '../actions/recommendations'
import { set as setModal } from '../actions/modal'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recommendations.items,
    isLoading: state.recommendations.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    getRecommendations: () => {
      dispatch(getRecommendations())
    },
    setModal: (title, body) => {
      dispatch(setModal(title, body))
    }
  }
}

const loadingMessage = <span>Loading...<Glyphicon className="spinning" glyph="refresh" /></span>

class Recommendations extends React.Component {

  constructor(props) {
    super(props)
    this.loadMoreTracks = this.loadMoreTracks.bind(this)
  }

  componentDidMount() {
    this.loadMoreTracks()
  }

  loadMoreTracks() {
    !this.props.isLoading && this.props.getRecommendations()
  }

  render() {
    return (
      <div>
        {this.props.items.length > 0 && <p><Button active={this.props.isLoading} onClick={this.props.getRecommendations}>{this.props.isLoading ? loadingMessage : 'Refresh suggestions'}</Button></p>}
        <div>
          {this.props.items.length === 0 && 
            <Panel>
              {this.props.isLoading ? loadingMessage : 'Once you have added liked tracks, a list of recommendations based off that will appear here.'}
            </Panel>
          }

          <Loader offset={5} onEnter={this.loadMoreTracks}>
            {this.props.items.map((track, i) => {
              return (
                <Track track={track} key={i}>
                  <div className="controls">
                    <PlayControls track={track} />
                    <SeedControls track={track} />
                    <GlyphText glyph="info-sign" text="Track Info" onClick={() => this.props.setModal(track.title, <TrackDetails track={track} />)} />
                  </div>
                </Track>
              )
            })}
          </Loader>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
