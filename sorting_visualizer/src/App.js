import "./App.css";
import Header from "./Components/Header/Header";
import BarChart from "./Components/Charts/BarChart/BarChart";
import Timer from "./Components/Timer/Timer";
import { connect } from "react-redux";

function App({ algorithm }) {
  return (
    <div className="App">
      <Header />
      <div className="heading-section">
        <h3 className="text-center">Visualizing: {algorithm}</h3>
        <Timer />
      </div>
      <BarChart />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    algorithm: state.algorithm,
  };
};

export default connect(mapStateToProps)(App);
