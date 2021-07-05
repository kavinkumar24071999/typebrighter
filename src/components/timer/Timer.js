import {Component} from "react";
import React from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.seconds
    }
    this.changeTime = this.changeTime.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  render() {
    return (<div className={'timer'}>
      0:{this.state.time}
      <button className={'start-button'} onClick={() => {
        this.props.onClick()
        this.startTimer()
      }}>Start
      </button>
    </div>)
  }

  startTimer() {
    this.interval = setInterval(this.changeTime, 1000)
  }

  changeTime() {
    if (this.isTimerRunning())
      this.setState({time: this.state.time - 1})
    else {
      this.endTimer()
    }
  }

  isTimerRunning() {
    return this.state.time > 0;
  }

  endTimer() {
    clearInterval(this.interval)
    this.props.onEnd()
    this.setState({time: this.props.seconds})
  }
}

export default Timer