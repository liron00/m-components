import React, { Component } from 'react'
import { autorun, computed, observable } from 'mobx'
import moment from 'moment'
import { m, util } from 'mframework'

@m
export default class Timestamp extends Component {
  static propTypes = {
    format: React.PropTypes.func,
    style: React.PropTypes.object,
    timestamp: React.PropTypes.number
  }

  static defaultProps = {
    format: ts => moment(ts).fromNow()
  }

  @observable timestampString

  componentWillMount() {
    this.reaction(
      () => this.props.timestamp,
      () => this.refreshTimestampString(),
      true
    )
    this.setInterval(() => {
      this.refreshTimestampString()
    }, 5000)
  }

  refreshTimestampString() {
    this.timestampString = this.props.format(this.props.timestamp)
  }

  render() {
    return (
      <timestamp
        style={this.props.style}
        title={new Date(this.props.timestamp).toString()}
      >
        {this.timestampString}
      </timestamp>
    )
  }
}
