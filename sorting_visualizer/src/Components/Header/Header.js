import { React, Component } from "react";
import { connect } from "react-redux";
import "./Header.css";
import {sortBubble} from '../../Alogrithms/BubbleSort';

class Header extends Component {
  state = {
    inputSize: 50,
    isInputValid: true,
  };

  isValidInputSize(inputSize) {
    while (inputSize >= 0 && inputSize <= 100) {
      return true;
    }
    return false;
  }

  setAppInputSize = (event) => {
    let inputSize = event.target.value;
    if (this.isValidInputSize(inputSize)) {
      this.setState({
        inputSize: inputSize,
        isInputValid: true,
      });
      this.props.dispatch({
        type: "SET_INPUT_SIZE",
        payload: inputSize,
      });
      this.props.dispatch({
        type: "SET_DATA",
        payload: inputSize,
      });
    } else {
      this.setState({
        isInputValid: false,
      });
    }
  };

  setAppAlgorithm = (algorithm) => {
    this.setState({
      algorithm: algorithm,
    });
    this.props.dispatch({
      type: "SET_ALGORITHM",
      payload: algorithm,
    });
  };

  runAlgorithm() {
    this.props.dispatch({
      type: "TOGGLE_ALGORITHM_RUNNING",
      payload: true,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Sorting Visualizer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Input Size
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">
                  <label>Input size</label>
                </a>
                <a className="dropdown-item">
                  <input
                    className={
                      this.state.isInputValid === true
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                    }
                    placeholder="size"
                    value={this.state.inputSize}
                    onChange={(event) => this.setAppInputSize(event)}
                  />
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item">
                  <div className="">
                    <div>
                      <input
                        type="range"
                        value={this.state.inputSize}
                        className="custom-range"
                        min="5"
                        max="100"
                        step="1"
                        onChange={(event) => this.setAppInputSize(event)}
                      />
                    </div>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Algorithm
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  onClick={() => this.setAppAlgorithm("Bubble Sort")}
                >
                  <label className="dropdown-item-label">Bubble Sort</label>
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => this.setAppAlgorithm("Selection Sort")}
                >
                  <label className="dropdown-item-label">Selection Sort</label>
                </a>
              </div>
            </li>
          </ul>
          <div>
            <button
              className="btn btn-warning"
              onClick={() => this.runAlgorithm()}
              disabled={this.props.isAlgorithmRunning}
            >
              Run
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputSize: state.inputSize,
    algorithm: state.algorithm,
    data: state.data,
    isAlgorithmRunning: state.isAlgorithmRunning
  };
};

export default connect(mapStateToProps)(Header);
