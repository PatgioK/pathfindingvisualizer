// import PathfindingVisualizer from "./PathfindingVisualizer";
import "./Node.css";
import React, { Component } from 'react';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const { startnode, endnode, col, row, isWall, onMouseUp, onMouseDown, onMouseEnter } = this.props;

        let extraClassName = "";
        if (startnode === true) extraClassName = " startnode";
        if (endnode === true) extraClassName = " endnode"
        if (isWall === true && endnode === false && startnode === false) extraClassName = " node-wall";
        return <div
            className={`Node ${extraClassName}`}
            id={`node-${this.props.row}-${this.props.col}`}

            onMouseDown={()=> onMouseDown(row, col)}
            onMouseUp={()=> onMouseUp(row, col)}
            onMouseEnter={()=> onMouseEnter(row, col)}
        ></div>
    }

};
