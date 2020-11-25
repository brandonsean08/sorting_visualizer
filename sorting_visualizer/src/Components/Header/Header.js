import { React, Component } from "react";
import { connect } from "react-redux";
import "./Header.css";

class Header extends Component {
  state = {
    inputSize: 20,
    sortSpeed: 500,
    isInputSizeValid: true,
    isSortSpeedValid: true
  };

  /**
   * Method to validate whether our array is between 0 and 100
   * @param {The size of our unsorted array} inputSize 
   */
  isValidInputSize(inputSize) {
    while (inputSize >= 0 && inputSize <= 100) {
      return true;
    }
    return false;
  }

  /**
   * Method to set how long each iteration of the loop takes (i.e. The sort speed)
   * @param {The speed at which the array sorts} sortSpeed 
   */
  isValidSortSpeed(sortSpeed) {
    while (sortSpeed >= 0 && sortSpeed <= 3000) {
      return true;
    }
    return false;
  }

  /**
   * Dispatches the action to set our input size in the store
   * @param {*} event 
   */
  setAppInputSize = (event) => {
    let inputSize = event.target.value;
    if (this.isValidInputSize(inputSize)) {
      this.setState({
        inputSize: inputSize,
        isInputSizeValid: true,
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
        isInputSizeValid: false,
      });
    }
  };

  /**
   * Dispatches the action to change the sort speed of our sort
   * @param {*} event 
   */
  setAppSortSpeed = (event) => {
      let sortSpeed = event.target.value;
      if(this.isValidSortSpeed(sortSpeed)) {
          this.setState({
              isSortSpeedValid: true
          })
          this.props.dispatch({
              type: "SET_SORT_SPEED",
              payload: sortSpeed
          })
      } else {
        this.setState({
            isSortSpeedValid: false
        })
      }
  }

  /**
   * Method to dispatch the action to set the algorithm we want to run
   * @param {The algorithm we want to run} algorithm 
   */
  setAppAlgorithm = (algorithm) => {
    this.setState({
      algorithm: algorithm,
    });
    this.props.dispatch({
      type: "SET_ALGORITHM",
      payload: algorithm,
    });
  };

  /**
   * Method to dispatch the action to run the actual algorithm
   */
  runAlgorithm() {
    this.props.dispatch({
      type: "TOGGLE_ALGORITHM_RUNNING",
      payload: true,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href={this.props.isAlgorithmRunning ? '' : '#'}>
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
                      this.state.isInputSizeValid === true
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                    }
                    placeholder="size"
                    value={this.state.inputSize}
                    onChange={(event) => this.setAppInputSize(event)}
                    disabled={this.props.isAlgorithmRunning}
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
                        disabled={this.props.isAlgorithmRunning}
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
                Speed
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">
                  <label>Speed of Sort</label>
                </a>
                <a className="dropdown-item">
                  <input
                    className={
                      this.state.isSortSpeedValid === true
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                    }
                    placeholder="speed"
                    value={this.state.sortSpeed}
                    onChange={(event) => this.setAppSortSpeed(event)}
                    disabled={this.props.isAlgorithmRunning}
                  />
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item">
                  <div className="">
                    <div>
                      <input
                        type="range"
                        value={this.state.sortSpeed}
                        className="custom-range"
                        min="0"
                        max="3000"
                        step="100"
                        onChange={(event) => this.setAppSortSpeed(event)}
                        disabled={this.props.isAlgorithmRunning}
                      />
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
          <div>
            <button
              className="btn btn-warning run-algorithm-btn"
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
    sortSpeed: state.sortSpeed,
    algorithm: state.algorithm,
    data: state.data,
    isAlgorithmRunning: state.isAlgorithmRunning
  };
};

export default connect(mapStateToProps)(Header);
