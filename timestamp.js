import React, { Component } from 'react'
import { autorun, computed, observable } from 'mobx'
import moment from 'moment'
import { m, util } from 'mframework'

@m
export default class Timestamp extends Component {
  static propTypes = {
    timestamp: React.PropTypes.number
  }

  @observable timestampString

  componentWillMount() {
    this.refreshTimestampString()
    this.setInterval(() => {
      this.refreshTimestampString()
    }, 5000)
  }

  refreshTimestampString() {
    this.timestampString = moment(this.props.timestamp).fromNow()
  }

  render() {
    return (
      <timestamp
      >
        {this.timestampString}
      </timestamp>
    )
  }
}
