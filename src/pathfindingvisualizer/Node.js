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
        // if (startNode == false && endNode == false) extraClassName = " ";
        return <div
            className={`Node ${extraClassName}`}
            id={`node-${this.props.row}-${this.props.col}`}
            // row={this.props.row}
            // col={this.props.col}

            // distance={distance}
            // isVisited={isVisited}
            // isWall={isWall}
            // previousNode={previousNode}

            //https://stackoverflow.com/questions/49784294/warning-received-false-for-a-non-boolean-attribute-how-do-i-pass-a-boolean-f
            // Passing boolean to custom attribute
            // startnode={startnode ? 1 : 0}
            // endnode={endnode ? 1 : 0}

            onMouseDown={()=> onMouseDown(row, col)}
            onMouseUp={()=> onMouseUp(row, col)}
            onMouseEnter={()=> onMouseEnter(row, col)}
            

        ></div>
    }

};
