import React, { useState, useEffect } from 'react';
import "./AlgoExplaination.css";

export default function AlgoExplaination(props) {
    const [text, setText] = useState("default");
    const [name, setName] = useState("def");
    // let algoProp = this.props.algoDef;
    useEffect(() => {
        switch (props.algoName) {
            case "Home":
                setName("");
                setText("My website for links my other projects!");
                break;
            case "path":
                setName("");
                setText("A pathfinding visualizer built with React! Click and drag to move the start or end nodes. Click on nodes to toggle walls!");
                break;
            case "Dikj":
                setText("Considered the father of pathfinding algorithms. Explores nodes based on distance from the start. Guarantees a shortest path");
                setName("Dikjstra's Algorithm: ");
                break;
            case "Astar":
                setText("A variant of Dikjstra's Algorithm. Uses a heuristic function to determine which node to explore next. The optimization results in shortests paths being found more quickly. Guarantees a shortest path");
                setName("A*: ");
                break;
            case "BestFirst":
                setText("An algorithm that explores nodes based on its distance from the target node. does NOT guarantee a shortest path");
                setName("Best First: ");
                break;
            case "BFS":
                setText("Uses a queue data structure to explore nodes. Guarantees a shortest path");
                setName("Breadth First: ");
                break;
            case "diag":
                setText("Toggle to allow diagonal pathing");
                setName("");
                break;
            default:
                setName("");
                setText("A pathfinding visualizer built with React! Click and drag to move the start or end nodes. Click on nodes to toggle walls!");
        }
    });

    return (
        <div className="algoExp"><span className="algoExpName">{name}</span>{text}</div>
    )
}