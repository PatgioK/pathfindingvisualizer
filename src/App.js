import './App.css';
import React from 'react';
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
// import ReactDOM from 'react-dom';

function App() {
  // const GlobalGrid = React.createContext([]);
  // ReactDOM.render(<PathfindingVisualizer ref={(PathfindingVisualizer) => {window.PathfindingVisualizer = PathfindingVisualizer}} />, document.getElementById("App"));
  return (
    <div className="App">
      <PathfindingVisualizer ref={(PathfindingVisualizer) => {window.PathfindingVisualizer = PathfindingVisualizer}} />
      {/* <PathfindingVisualizer /> */}
      
    </div>
  );
}

// ReactDOM.render(<PathfindingVisualizer ref={(PathfindingVisualizer) => {window.PathfindingVisualizer = PathfindingVisualizer}}/>, document.getElementById("App"))
// ReactDOM.render(<Page ref={(ourComponent) => {window.ourComponent = ourComponent}} />, document.getElementById("app"));

export default App;
