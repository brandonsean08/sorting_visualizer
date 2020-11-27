import React, { Component } from "react";
import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { algorithms, barColors } from "../../../constants";

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
      tooltips: {
        enabled: false
      },
      animations: {
        duration: 500
      },
      maintainAspectRatio: false,
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
   * We are doing this to cause a page re-render as the part that is changing is a nested property in the object.
   * So React isn't re-rendering (needs a deep check)
   * @param {The previous state} originalData
   * @param {The new state} datasetsCopy
   */
  setStateForBarchart(originalData, datasetsCopy) {
    this.setState({
      data: {},
    });
    this.setState({
      data: Object.assign({}, originalData.data, {
        datasets: datasetsCopy,
      }),
    });
  }

  /**
   * method to perform the actual bubble sort
   * @param {The original array that we want to sort (i.e. The unsorted array)} originalData
   */
  async runBubbleSort(originalData) {
    if (this.props.algorithm === algorithms.BUBBLE_SORT) {
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
          backgroundColorsArrayCopy[j + 1] = barColors.YELLOW;
          backgroundColorsArrayCopy[j + 2] = barColors.RED;
          if (dataArrayCopy[j] > dataArrayCopy[j + 1]) {
            // Doing the swap
            let tmp = dataArrayCopy[j];
            dataArrayCopy[j] = dataArrayCopy[j + 1];
            dataArrayCopy[j + 1] = tmp;
            // Changing the colors back after the swap
            backgroundColorsArrayCopy[j - 1] = barColors.NEUTRAL;
            backgroundColorsArrayCopy[j] = barColors.NEUTRAL;
          } else {
            // Changing the colors if they do not swap
            backgroundColorsArrayCopy[j] = barColors.NEUTRAL;
          }
          //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
          originalData.datasets[0].data = dataArrayCopy;
          originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
          this.setStateForBarchart(originalData, datasetsCopy);
          // Sleeping for 0.5s
          await this.sleep(this.props.sortSpeed);
        }
        // Setting the colors of the values that we have already checked
        backgroundColorsArrayCopy[backgroundColorsArrayCopy.length - i - 1] =
          barColors.GREEN;
        backgroundColorsArrayCopy[backgroundColorsArrayCopy.length - i - 2] =
          barColors.GREEN;
      }
      //Setting the first index to checked once we have completed the entire sort
      backgroundColorsArrayCopy[0] = barColors.GREEN;
      this.setStateForBarchart(originalData, datasetsCopy);
      // Indicate that we have completed the sort
      this.props.dispatch({
        type: "TOGGLE_ALGORITHM_RUNNING",
        payload: false,
      });
    }
  }

  /**
   * method to perform the actual selection sort
   * @param {The original array that we want to sort (i.e. The unsorted array)} originalData
   */
  async runSelectionSort(originalData) {
    if (this.props.algorithm === algorithms.SELECTION_SORT) {

      // Extracting the variables that we need to work with
      let len = originalData.datasets[0].data.length;
      let datasetsCopy = originalData.datasets.slice(0);
      let dataArrayCopy = datasetsCopy[0].data;
      let backgroundColorsArrayCopy = datasetsCopy[0].backgroundColor;

      // Declaring the two indeces needed for our array
      let i;
      let j;
      let min_index;

      // Starting the actual Selection Sort
      for (i = 0; i < len - 1; i++) {
        min_index = i;
        backgroundColorsArrayCopy[min_index] = barColors.RED;
        for (j = i + 1; j < len; j++) {
          // Changing the colors
          backgroundColorsArrayCopy[j] = barColors.YELLOW;
          //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
          originalData.datasets[0].data = dataArrayCopy;
          originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
          this.setStateForBarchart(originalData, datasetsCopy);
          await this.sleep(this.props.sortSpeed);

          if (dataArrayCopy[j] < dataArrayCopy[min_index]) {
            if (min_index !== i) {
              backgroundColorsArrayCopy[min_index] = barColors.NEUTRAL;
            }
            min_index = j;
            backgroundColorsArrayCopy[min_index] = barColors.RED;
            backgroundColorsArrayCopy[i] = barColors.NEUTRAL;
          } else {
            backgroundColorsArrayCopy[j] = barColors.NEUTRAL;
          }
          //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
          originalData.datasets[0].data = dataArrayCopy;
          originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
          this.setStateForBarchart(originalData, datasetsCopy);
        }

        if (min_index !== i) {
          let temp = dataArrayCopy[i];
          dataArrayCopy[i] = dataArrayCopy[min_index];
          dataArrayCopy[min_index] = temp;

          backgroundColorsArrayCopy[min_index] = barColors.NEUTRAL;
          backgroundColorsArrayCopy[i] = barColors.NEUTRAL;
          originalData.datasets[0].data = dataArrayCopy;
          originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
          this.setStateForBarchart(originalData, datasetsCopy);
        }
        // Setting the colors of the values that we have already checked
        backgroundColorsArrayCopy[i] = barColors.GREEN;
        //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
        originalData.datasets[0].data = dataArrayCopy;
        originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
        this.setStateForBarchart(originalData, datasetsCopy);
      }
      //Setting the first index to checked once we have completed the entire sort
      backgroundColorsArrayCopy[i] = barColors.GREEN;
      //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
      originalData.datasets[0].data = dataArrayCopy;
      originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
      this.setStateForBarchart(originalData, datasetsCopy);
      // Indicate that we have completed the sort
      this.props.dispatch({
        type: "TOGGLE_ALGORITHM_RUNNING",
        payload: false,
      });
    }
  }

    /**
   * method to perform the actual insertion sort
   * @param {The original array that we want to sort (i.e. The unsorted array)} originalData
   */
  async runInsertionSort(originalData) {
    if (this.props.algorithm === algorithms.INSERTION_SORT) {

      // Extracting the variables that we need to work with
      let len = originalData.datasets[0].data.length;
      let datasetsCopy = originalData.datasets.slice(0);
      let dataArrayCopy = datasetsCopy[0].data;
      let backgroundColorsArrayCopy = datasetsCopy[0].backgroundColor;

      // Declaring the two indeces needed for our array
      let i;
      let j;
      let current;

      for (i = 1; i < len; i++) {
        backgroundColorsArrayCopy[i] = barColors.YELLOW
        // Choosing the first element in our unsorted subarray
        current = dataArrayCopy[i];
        // The last element of our sorted subarray
        j = i-1; 
        //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
        originalData.datasets[0].data = dataArrayCopy;
        originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
        this.setStateForBarchart(originalData, datasetsCopy);

        await this.sleep(this.props.sortSpeed)

        while ((j > - 1) && (current < dataArrayCopy[j])) {
          backgroundColorsArrayCopy[j] = barColors.RED;
          dataArrayCopy[j + 1] = dataArrayCopy[j];
          backgroundColorsArrayCopy[j + 1] = barColors.GREEN;

          //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
          originalData.datasets[0].data = dataArrayCopy;
          originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
          this.setStateForBarchart(originalData, datasetsCopy);

          await this.sleep(this.props.sortSpeed)

          if(j === (i - 1)) {
            backgroundColorsArrayCopy[j + 1] = barColors.YELLOW;
          } else {
            backgroundColorsArrayCopy[j + 1] = barColors.NEUTRAL;
          }

            j--;
        }

        dataArrayCopy[j+1] = current;

        for(let t = 0; t < i; t++) {
          backgroundColorsArrayCopy[t] = barColors.GREEN;
        }

        //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
        originalData.datasets[0].data = dataArrayCopy;
        originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
        this.setStateForBarchart(originalData, datasetsCopy);
    }

    backgroundColorsArrayCopy[i - 1] = barColors.GREEN;

    //Setting the copied arrays of values and colors back to the original array so that setState recognises the deep change
    originalData.datasets[0].data = dataArrayCopy;
    originalData.datasets[0].backgroundColor = backgroundColorsArrayCopy;
    this.setStateForBarchart(originalData, datasetsCopy);

      // Indicate that we have completed the sort
      this.props.dispatch({
        type: "TOGGLE_ALGORITHM_RUNNING",
        payload: false,
      });
    }
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
          case algorithms.BUBBLE_SORT:
            this.runBubbleSort(this.props.data);
          case algorithms.SELECTION_SORT:
            this.runSelectionSort(this.props.data);
          case algorithms.INSERTION_SORT:
            this.runInsertionSort(this.props.data);
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
