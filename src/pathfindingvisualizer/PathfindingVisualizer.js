import React from "react";
import Node from "./Node";
import "./PathfindingVisualizer.css";
import { Dikjstras } from "./Algorithms/Dikjstras";

const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 6;

const START_NODE_ROW = 5;
const START_NODE_COL = 5;

const END_NODE_ROW = 5;
const END_NODE_COL = 11;


// React uses JSX not plain javascript, first letter of tag indicates elements. 
// Uppercase used to specify react components; ie cant camelCase.
export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            mouseLeftDown: false,
        };
    }

    componentDidMount() {
        this.resetGrid();
        // const grid = this.mapGrid();
        // this.setState(grid);
    }

    resetGrid() {
        const grid = [];
        for (let i = 0; i < GRID_COL_LENGTH; i++) {
            let currentRow = [];
            for (let j = 0; j < GRID_ROW_LENGTH; j++) {
                const newNode = createNode(i,j)
                // currentRow.push(createNode(i, j));
                currentRow.push(newNode);
                // console.log(newNode);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        this.setState({mouseLeftDown: true});
        return;
    }

    handleMouseEnter(row, col) {
        // console.log("row: " + row + " col: " + col);
        return;
    }

    handleMouseUp(row, col) {
        this.setState({mouseLeftDown: false});
        return;
    }

    helperDikjstras() { 
        const {grid} = this.state;
        // console.log(grid);
        const startnode = grid[START_NODE_ROW][START_NODE_COL];
        const endnode = grid[END_NODE_ROW][END_NODE_COL];
        Dikjstras(grid, startnode, endnode);

        return;

    }


    getEndNodeDom() {
        const endnode = document.getElementsByClassName(`endnode`);
        return endnode;
    }

    getStartNodeDom() {
        const startnode = document.getElementsByClassName(`startnode`);
        // console.log(startnode);
        return startnode;
    }

    mapGrid() {
        const {grid } = this.state;
        return grid.map((row, rowId) => {
            return (
                <div key={rowId}>
                    {row.map((node, nodeId) => {
                        let { startnode, endnode, distance, isVisited, isWall, previousNode } = node;
                        return <Node
                            key={nodeId} 
                            row={rowId} 
                            col={nodeId} 
                            startnode={startnode} 
                            endnode={endnode} 
                            // distance={distance}
                            // isVisited={isVisited}
                            isWall={isWall}
                            // previousNode={previousNode}
                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                            onMouseUp={(row, col) => this.handleMouseUp(row, col)}

                        ></Node>
                    })}
                </div>
            )
        })
    }

    

    render() {
        const { grid } = this.state;
        return (
            <React.Fragment>
            <div className="button-bar">
                <button onClick={() => console.log(this.state.grid)}> check grid</button>
                <button onClick={() => this.helperDikjstras()}>Dikjstras</button>
            </div>
                <div className="grid-container">
                    {/* {grid.map((row, rowId) => {
                        return (
                            <div key={rowId}>
                                {row.map((node, nodeId) => {
                                    let { startnode, endnode, distance, isVisited, isWall, previousNode } = node;
                                    return <Node
                                        key={nodeId} 
                                        row={rowId} 
                                        col={nodeId} 
                                        startnode={startnode} 
                                        endnode={endnode} 
                                        // distance={distance}
                                        // isVisited={isVisited}
                                        isWall={isWall}
                                        // previousNode={previousNode}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}

                                    ></Node>
                                })}
                            </div>
                        )
                    })} */}
                    {this.mapGrid()}
                </div>
            </React.Fragment>
        );
    }
}


function createNode(row, col) {
    return {
        row: row,
        col: col,
        startnode: row === START_NODE_ROW && col === START_NODE_COL,
        endnode: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

// return array of unvisited neighbors of node
// does not include diagonal
export function getUnvisitedNeighbors(grid, node) {
    const {row , col} = node;
    const neighbors = [];
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    // console.log(neighbors);
    neighbors.filter(neighbor => !neighbor.isVisited);
    // console.log(neighbors);
    return neighbors;

}

//return array of all nodes in 1d array
export function getAllNodes(grid) {
    const nodes = [];
    // console.log('start get all nodes');
    // console.log(grid);
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    // console.log(nodes);
    return nodes;
}

// sorts input array of nodes by their distance
export function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }