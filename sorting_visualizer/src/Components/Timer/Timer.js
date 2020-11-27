import React, { useState, useEffect } from "react";
import ReactTimerStopwatch from "react-stopwatch-timer";
import './Timer.css';
import {connect} from 'react-redux';

const Timer = ({isAlgorithmRunning}) => {
  const [isOn, setIsOn] = useState(false);
  const [fromTime, setFromTime] = useState(new Date(0, 0, 0, 0, 0, 0, 0))

  useEffect(() => {
    if(isAlgorithmRunning) {
        setIsOn(isAlgorithmRunning);
    } else {
        setIsOn(isAlgorithmRunning);
        setFromTime(new Date(0, 0, 0, 0, 0, 0, 0))
    }
  }, [isAlgorithmRunning])

  return (
    <div className="timer">
      <ReactTimerStopwatch
        isOn={isOn}
        className="react-stopwatch-timer__table"
        watchType="stopwatch"
        displayCircle={false}
        displayHours={false}
        fromTime={fromTime}
      />
    </div>
  );
};

const mapStateToProps = state => {
    return {
        isAlgorithmRunning: state.isAlgorithmRunning
    }
}

export default connect(mapStateToProps)(Timer);
