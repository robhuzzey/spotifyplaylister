import React from 'react'
import { connect } from 'react-redux'
import { authenticate, checkAccessToken } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated,
    accessToken: state.authenticate.accessToken
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: () => {
      dispatch(authenticate())
    },
    checkAccessToken: () => {
      dispatch(checkAccessToken())
    }
  }
}

class Authenticate extends React.Component {
  constructor(props) {
    super(props)
    props.checkAccessToken()
  }

  componentDidUpdate() {
    this.props.checkAccessToken()
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          this.props.children
        :
          (<button onClick={this.props.authenticate}>Authenticate</button>)
        }
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate)
