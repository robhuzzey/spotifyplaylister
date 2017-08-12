import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'
import Loader from '../components/Loader.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'
import PlaylistControls from '../containers/PlaylistControls'

import { Badge, Button, ButtonGroup, Panel, Glyphicon } from 'react-bootstrap'

import { getRecommendations, clearRecommendations } from '../actions/recommendations'
import { set as setModal } from '../actions/modal'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recommendations.items,
    isLoading: state.recommendations.isLoading,
    seeds: state.seeds.items
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
    },
    clearRecommendations: () => {
      dispatch(clearRecommendations())
    },
  }
}

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
        {this.props.isLoading && (
          <span>Loading...<Glyphicon className="spinning" glyph="refresh" /></span>
        )}

        {this.props.items.length > 0 ? (
          <p><Button onClick={this.props.clearRecommendations}>Clear suggestions</Button></p>
        ) : (
          <p><Button active={this.props.isLoading} onClick={this.props.getRecommendations}>Reload suggestions</Button></p>
        )}
        <div>
          {this.props.seeds.length === 0 && 
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
                    <PlaylistControls track={track} />
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
