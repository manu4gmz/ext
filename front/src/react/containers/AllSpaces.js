import React from "react";
import { connect } from "react-redux";

import BackgroundAllSpaces from "../components/backgroundAllSpaces";
import { fetchId } from "../../redux/actions/spaces"


class AllSpaces extends React.Component {
  constructor(props) {
    super(props);
    this.sendId = this.sendId.bind(this);
    this.showComments = this.showComments.bind(this)
  }

  sendId(id) {
    this.props.fetchId(id)
    return this.props.navigation.navigate('Root', { screen: `SingleView` })
  }

  showComments(id) {
    this.props.fetchId(id)
    return this.props.navigation.navigate('Root', { screen: `Comments` })
  }

  render() {
    return (
      <BackgroundAllSpaces
        allSpaces={this.props.allSpaces}
        navigation={this.props.navigation}
        sendId={this.sendId}
        showComments={this.showComments}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

    allSpaces: state.spaces.allSpaces
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchId: (id) => (dispatch(fetchId(id)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);