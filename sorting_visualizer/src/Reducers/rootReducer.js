//Defining the initial state of our application
const initState = {
  inputSize: 20,
  sortSpeed: 500,
  algorithm: "Bubble Sort",
  isAlgorithmRunning: false,
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  },
};

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function populateDataArray(inputSize) {
  let labels = new Array(inputSize);
  let values = new Array(inputSize);
  let backgroundColor = new Array(inputSize);

  for (let i = 0; i < inputSize; i++) {
    labels[i] = i + 1;
    values[i] = generateRandomNumber();
    backgroundColor[i] = "#28363D";
  }
  return {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColor,
      },
    ],
  };
}

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "SET_INPUT_SIZE":
      return {
        ...state,
        inputSize: action.payload,
      };
    case "SET_ALGORITHM":
      return {
        ...state,
        algorithm: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: populateDataArray(action.payload),
      };
    case "SET_SORTED_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "TOGGLE_ALGORITHM_RUNNING":
      return {
        ...state,
        isAlgorithmRunning: action.payload,
      };
    case "SET_SORT_SPEED":
      return {
        ...state,
        sortSpeed: action.payload,
      };
    default:
      return state;
  }
}
