import React, { Component } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class BarChart extends Component {
  state = {
    inputSize: this.props.inputSize,
    sortSpeed: this.props.sortSpeed,
    data: this.props.data,
    isAlgorithmRunning: this.props.isAlgorithmRunning,
    barChartDefaultOptions: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  };

  /**
   * Method to sleep for a given time
   * @param {The time we want to sleep for} ms
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * method to perform the actual bubble sort
   * @param {The original array that we want to sort (i.e. The unsorted array)} originalData
   */
  async runBubbleSort(originalData) {
    // Extracting the variables that we need to work with
    let len = originalData.datasets[0].data.length;
    let datasetsCopy = originalData.datasets.slice(0);
    let dataArrayCopy = datasetsCopy[0].data;
    let backgroundColorsArrayCopy = datasetsCopy[0].backgroundColor;

    // Declaring the two indeces needed for our array
    let i = 0;
    let j = 0;

    // Starting the actual Bubble Sort
    for (i = 0; i < len - 1; i++) {
      for (j = 0; j < len - 1 - i; j++) {
        // Changing the colors
        backgroundColorsArrayCopy[j + 1] = "#F6D55C";
        backgroundColorsArrayCopy[j + 2] = "#ED553B";
        if (dataArrayCopy[j] > dataArrayCopy[j + 1]) {
          // Doing the swap
          let tmp = dataArrayCopy[j];
          dataArrayCopy[j] = dataArrayCopy[j + 1];
          dataArrayCopy[j + 1] = tmp;
          // Changing the colors back after the swap
          backgroundColorsArrayCopy[j - 1] = "#28363D";
          backgroundColorsArrayCopy[j] = "#28363D";
        } else {
          // Changing the colors if they do not swap
          backgroundColorsArrayCopy[j] = "#28363D";
        }
        //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
        originalData.datasets[0].data = dataArrayCopy;
        originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
        this.setState({
          data: {},
        });
        this.setState({
          data: Object.assign({}, originalData.data, {
            datasets: datasetsCopy,
          }),
        });
        // Sleeping for 0.5s
        await this.sleep(this.props.sortSpeed);
      }
      // Setting the colors of the values that we have already checked
      backgroundColorsArrayCopy[backgroundColorsArrayCopy.length - i - 1] =
        "#3CAEA3";
      backgroundColorsArrayCopy[backgroundColorsArrayCopy.length - i - 2] =
        "#3CAEA3";
    }
    //Setting the first index to checked once we have completed the entire sort
    backgroundColorsArrayCopy[0] = "#3CAEA3";
    this.setState({
      data: {},
    });
    this.setState({
      data: Object.assign({}, originalData.data, {
        datasets: datasetsCopy,
      }),
    });
    // Indicate that we have completed the sort
    this.props.dispatch({
      type: "TOGGLE_ALGORITHM_RUNNING",
      payload: false,
    });
  }

  /**
   * Listening for a redux store change in the props
   * @param {The props that our component has recieved when the redux store changes} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        data: nextProps.data,
      });
    }
    if (this.props.isAlgorithmRunning !== nextProps.isAlgorithmRunning) {
      this.setState({
        isAlgorithmRunning: nextProps.isAlgorithmRunning,
      });
      if (nextProps.isAlgorithmRunning) {
        switch (nextProps.algorithm) {
          case "Bubble Sort":
            this.runBubbleSort(this.props.data);
          default:
            break;
        }
      }
    }
  }

  /**
   * Dispatching the action to set the data array when the chart loads
   */
  componentDidMount() {
    this.props.dispatch({
      type: "SET_DATA",
      payload: this.state.inputSize,
    });
  }

  render() {
    return (
      <div className="bar-chart-canvas">
        <h3 className="text-center">Visualizing: {this.props.algorithm}</h3>
        <Bar
          data={this.state.data}
          options={this.state.barChartDefaultOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inputSize: state.inputSize,
    sortSpeed: state.sortSpeed,
    algorithm: state.algorithm,
    data: state.data,
    isAlgorithmRunning: state.isAlgorithmRunning,
  };
};

export default connect(mapStateToProps)(BarChart);
