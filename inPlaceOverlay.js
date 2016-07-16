import React, { Component } from 'react'
import { autorun, computed, observable } from 'mobx'
import { dimensions, m, util } from 'mframework'

@m
export default class InPlaceOverlay extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    overlayStyle: React.PropTypes.object
  }

  @observable elemClickTarget
  @observable showing = false

  _outsideClickHandler = (e) => {
    if (!this.elemClickTarget.contains(e.target)) {
      this.showing = false
    }
  }

  componentWillMount() {
    this.autorun(() => {
      if (this.showing) {
        document.addEventListener(
          dimensions.isMobile? 'click' : 'mousedown',
          this._outsideClickHandler
        )
      } else {
        document.removeEventListener(
          dimensions.isMobile? 'click' : 'mousedown',
          this._outsideClickHandler
        )
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener(
      dimensions.isMobile? 'click' : 'mousedown',
      this._outsideClickHandler
    )
  }

  render() {
    const padding = 10

    return (
      <inPlaceOverlay
        style={{
        }}
      >
        <img
          src="/images/dropdown.png"
          onMouseDown={e => {
            if (!dimensions.isMobile) {
              this.showing = !this.showing
            }
          }}
          onClick={e => {
            if (dimensions.isMobile) {
              this.showing = !this.showing
            }
          }}
          style={{
            opacity: this.showing? .4 : .9,
            cursor: 'pointer',
            width: 24 + 2 * padding,
            height: 24 + 2 * padding,
            padding
          }}
        />
        {this.showing && <overlaySec
          ref={elem => this.elemClickTarget = elem}
          style={
            Object.assign(
              {
                position: 'absolute',
                zIndex: 10,
                boxShadow: '4px 4px 10px 0px rgba(50, 50, 50, 0.57)',
              },
              this.props.overlayStyle || {}
            )
          }
        >
          {this.props.children}
        </overlaySec>}
      </inPlaceOverlay>
    )
  }
}
