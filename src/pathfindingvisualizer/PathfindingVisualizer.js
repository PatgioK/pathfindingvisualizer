import React from "react";
import Node from "./Node";
import "./PathfindingVisualizer.css";
import { Dikjstras } from "./Algorithms/Dikjstras";
import { setTimeout } from 'timers';
import {  StartEndStrat, WallStrat } from "./MouseStrat";

const GRID_ROW_LENGTH = 25;
const GRID_COL_LENGTH = 10;

const START_NODE_ROW = 6;
const START_NODE_COL = 24;
const END_NODE_ROW = 8;
const END_NODE_COL = 2;

const ANIMATION_SPEED = 100;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// React uses JSX not plain javascript, first letter of tag indicates elements. 
// Uppercase used to specify react components; ie cant camelCase.
export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: [],
            mouseLeftDown: false,
            // mouseStrat: null,
        };
        const mouseStrat2 = null;
    }
    changeStuff(paramsIfAny) {
        this.setState({ grid: paramsIfAny });
    }

    componentDidMount() {
        this.resetGrid();
        // this.mouseStrat = new StartEndStrat();
        this.mouseStrat2 = new WallStrat();
        // console.log(this.mouseStrat2);
    }

    resetGrid() {
        const grid = [];
        for (let i = 0; i < GRID_COL_LENGTH; i++) {
            let currentRow = [];
            for (let j = 0; j < GRID_ROW_LENGTH; j++) {
                const newNode = createNode(i, j)
                // currentRow.push(createNode(i, j));
                currentRow.push(newNode);
                // console.log(newNode);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
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
        const { grid } = this.state;
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
                            // onMouseDown={(row, col) => this.mouseStrat2.handleMouseDown(row, col)}
                            onMouseDown={(row, col) => this.mouseStrat2.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) => this.mouseStrat2.handleMouseEnter(row, col)}
                            onMouseUp={(row, col) => this.mouseStrat2.handleMouseUp(row, col)}

                        ></Node>
                    })}
                </div>
            )
        })
    }


    // Follows previousNode property from endNode to startNode.
    // Must be called AFTER pathfinding algo
    shortestPathFromEnd(startNode, endNode) {
        // console.log('shortestPathFromEnd');
        // console.log(endNode);
        // console.log(startNode);
        const path = [];
        let currentNode = endNode
        while (currentNode != null) {
            // let i = 0;
            // while (i < 50) {
            console.log("shortestPathFromEnd");
            console.log(currentNode);
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
            // i++;
        }
        return path;
    }


    helperDikjstras = async () => {
        const { grid } = this.state;
        const startnode = grid[START_NODE_ROW][START_NODE_COL];
        const endnode = grid[END_NODE_ROW][END_NODE_COL];
        const visitedNodes = Dikjstras(grid, startnode, endnode);
        console.log(visitedNodes);
        const path = this.shortestPathFromEnd(startnode, endnode);

        await this.colorVisited(visitedNodes);
        await this.colorPath(path);
        // const a = this.colorVisited(visitedNodes);
        // Promise.all([a]).then(() => this.colorPath(path));
        // const b = await this.colorPath(path);
        // await this.colorVisited(visitedNodes);
        // await this.colorPath(path);
        // this.colorVisited(visitedNodes).then(() => {this.colorPath(path)});
        // this.colorVisited(visitedNodes).then(() => this.colorPath(path));
    }

    colorVisited = async (visitedNodes) => {
        for (let i = 0; i < visitedNodes.length; i++) {
            console.log("colorVisited")

            const node = visitedNodes[i];

            var element = document.getElementById(`node-${node.row}-${node.col}`);
            if (!element.classList.contains("startnode") && !element.classList.contains("endnode")) {
                element.classList.add("node-visited");
            }
            await sleep(ANIMATION_SPEED * 0.1);
            // setTimeout(() => {
            //     const node = visitedNodes[i];
            //     var element = document.getElementById(`node-${node.row}-${node.col}`);
            //     if (!element.classList.contains("startnode") && !element.classList.contains("endnode")) {
            //         element.classList.add("node-visited");
            //     }
            // }, 10 * i);
        }
        return;
    }

    colorPath = async (path) => {
        for (let i = 0; i < path.length; i++) {
            console.log("colorPath")
            const node = path[i];
            var element = document.getElementById(`node-${node.row}-${node.col}`);
            if (!element.classList.contains("startnode") && !element.classList.contains("endnode")) {
                element.classList.add("node-path");
            }
            await sleep(ANIMATION_SPEED * 0.5);
        }
        return;
    }

    setWallStrat() {
        // let strat = new WallStrat();
        // this.setState({mouseStrat: {strat}});
        this.mouseStrat2 = new WallStrat();
    }

    getNewGridWithWallToggled  (grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
      };

    render() {
        const { grid } = this.state;
        return (
            <React.Fragment>
                <div className="button-bar">
                    <button onClick={() => console.log(this.state.grid)}> check grid</button>
                    <button onClick={() => this.helperDikjstras()}>Dikjstras</button>
                    <button onClick={() => this.mouseStrat2 = new StartEndStrat(this)}>startendstrat</button>
                    <button onClick={() => this.mouseStrat2 = new WallStrat(this)}>wallstrat</button>
                    {/* <MouseStrat changeHandler={this.changeStuff.bind(this)} /> */}
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
                <div>
                </div>
            </React.Fragment>
        );
    }
}



function createNode(row, col) {
    return {
        isVisited: false,
        row: row,
        col: col,
        startnode: row === START_NODE_ROW && col === START_NODE_COL,
        endnode: row === END_NODE_ROW && col === END_NODE_COL,
        distance: Infinity,
        isWall: false,
        previousNode: null
    }
}

// return array of unvisited neighbors of node
// does not include diagonal
export function getUnvisitedNeighbors(grid, node) {
    const { row, col } = node;
    let neighbors = [];
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    // console.log("before");
    // console.log(neighbors);
    neighbors = neighbors.filter(neighbor => !neighbor.isVisited);     //returning same array
    // console.log("after")
    // console.log(neighbors);
    return neighbors;
}

export function getUnvisitedNeighbors2(grid, node) {
    const { row, col } = node;
    const dist = (node, row, col, ) => { return Math.abs(Math.sqrt(Math.pow(node.row - row, 2) + Math.pow(node.col - col, 2))) }
    let neighbors = grid.filter(
        function (e) {
            return e.isVisited && dist(e, row, col) == 1
        }, node)
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
