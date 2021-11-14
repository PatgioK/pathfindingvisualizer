import React from "react";
import Node from "./Node";
import "./PathfindingVisualizer.css";
import { Dikjstras } from "./Algorithms/Dikjstras";
import { setTimeout } from 'timers';
import { StartEndStrat, WallStrat } from "./MouseStrat";
import { Astar } from "./Algorithms/Astar"

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
            GRID_ROW_LENGTH: 45,
            GRID_COL_LENGTH: 25,

            START_NODE_ROW: 7,
            START_NODE_COL: 3,
            END_NODE_ROW: 7,
            END_NODE_COL: 20,
        };
        const diagonalPathing = false;
        const mouseStrat2 = null;
    }

    componentDidMount() {
        this.resetGrid();
        this.mouseStrat2 = new StartEndStrat();
        this.diagonalPathing = false;
        // console.log(this.mouseStrat2);
    }

    resetWall = async () => {
        const grid = this.state.grid;
        for (let i = 0; i < this.state.GRID_COL_LENGTH; i++) {
            for (let j = 0; j < this.state.GRID_ROW_LENGTH; j++) {
                grid[i][j].isWall = false;
            }
        }
        this.setState({ grid: grid });
        return;
    }

    resetPath = async () => {
        const grid = this.state.grid;
        for (let i = 0; i < this.state.GRID_COL_LENGTH; i++) {
            for (let j = 0; j < this.state.GRID_ROW_LENGTH; j++) {
                grid[i][j].previousNode = null;
                grid[i][j].distance = Infinity;
                grid[i][j].isVisited = false;
                grid[i][j].Gcost = Infinity;
                grid[i][j].Hcost = Infinity;

            }
        }
        this.setState({ grid: grid });
        return;
    }

    resetGrid = async () => {
        const grid = [];
        for (let i = 0; i < this.state.GRID_COL_LENGTH; i++) {
            let currentRow = [];
            for (let j = 0; j < this.state.GRID_ROW_LENGTH; j++) {
                const newNode = this.createNode(i, j)
                currentRow.push(newNode);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
        return;
    }

    resetCss = async () => {
        for (let i = 0; i < this.state.GRID_COL_LENGTH; i++) {
            for (let j = 0; j < this.state.GRID_ROW_LENGTH; j++) {
                let node = document.getElementById(`node-${i}-${j}`);

                //these classes not set by Node.js, not in state grid so manual remove, only for animation
                node.classList.remove("node-visited");
                node.classList.remove("node-path");
            }
        }
        return;
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
        const path = [];
        let currentNode = endNode
        while (currentNode != null) {
            // console.log(currentNode);
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return path;
    }

    helperAstar = async () => {
        await this.resetCss();
        await this.resetPath();
        const { grid } = this.state;
        const startnode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const endnode = grid[this.state.END_NODE_ROW][this.state.END_NODE_COL];
        const visitedNodes = Astar(grid, startnode, endnode, this.diagonalPathing);

        const path = this.shortestPathFromEnd(startnode, endnode);
        await this.colorVisited(visitedNodes);
        await this.colorPath(path);
    }

    helperDikjstras = async () => {
        await this.resetCss();
        await this.resetPath();
        const { grid } = this.state;
        const startnode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const endnode = grid[this.state.END_NODE_ROW][this.state.END_NODE_COL];
        const visitedNodes = Dikjstras(grid, startnode, endnode);
        // console.log(visitedNodes);
        const path = this.shortestPathFromEnd(startnode, endnode);

        await this.colorVisited(visitedNodes);
        await this.colorPath(path);
    }

    colorVisited = async (visitedNodes) => {
        for (let i = 0; i < visitedNodes.length; i++) {
            const node = visitedNodes[i];
            var element = document.getElementById(`node-${node.row}-${node.col}`);
            if (!element.classList.contains("startnode") && !element.classList.contains("endnode")) {
                element.classList.add("node-visited");
            }
            await sleep(ANIMATION_SPEED * 0.1);
        }
        return;
    }

    colorPath = async (path) => {
        for (let i = 0; i < path.length; i++) {
            const node = path[i];
            var element = document.getElementById(`node-${node.row}-${node.col}`);
            if (!element.classList.contains("startnode") && !element.classList.contains("endnode")) {
                element.classList.add("node-path");
            }
            await sleep(ANIMATION_SPEED * 0.5);
        }
        return;
    }

    getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    createNode(row, col) {
        return {
            distance: Infinity,
            isVisited: false,
            row: row,
            col: col,
            startnode: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            endnode: row === this.state.END_NODE_ROW && col === this.state.END_NODE_COL,
            isWall: false,
            previousNode: null,
            Hcost: Infinity,
            Gcost: Infinity,
            
        }
    }

    toggleDiagonal() {
        this.diagonalPathing = !this.diagonalPathing;
        console.log(this.diagonalPathing);
    }

    // return array of unvisited neighbors of node
    // does not include diagonal
    getUnvisitedNeighbors(grid, node) {
        const { row, col } = node;
        let neighbors = [];
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);

        neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        return neighbors;
    }

    // also need checks to allow / disallow diagonal pathing through corners
    getUnvisitedNeighborsDiag(grid, node) {
        const { row, col } = node;
        let neighbors = [];
        if (this.diagonalPathing) {
            // ⬉
            if (row > 0 && col > 0) {
                if (!grid[row - 1][col].isWall || !grid[row][col - 1].isWall)
                    neighbors.push(grid[row - 1][col - 1]);
            }
            // ⬈
            if (row > 0 && col < grid[0].length - 1) {
                if (!grid[row - 1][col].isWall || !grid[row][col + 1].isWall)
                    neighbors.push(grid[row - 1][col + 1]);
            }
            // ⬊
            if (row < grid.length - 1 && col < grid[0].length - 1) {
                if (!grid[row + 1][col].isWall || !grid[row][col + 1].isWall)
                    neighbors.push(grid[row + 1][col + 1]);
            }
            // ⬋
            if (row < grid.length - 1 && col > 0) {
                if (!grid[row + 1][col].isWall || !grid[row][col - 1].isWall)
                    neighbors.push(grid[row + 1][col - 1]);
            }
        }

        neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        return neighbors;
    }

    render() {
        const { grid } = this.state;
        return (
            <React.Fragment>
                <div className="button-bar">
                    {/* <button onClick={() => console.log(this.state.grid)}> check grid</button> */}
                    <button onClick={() => this.resetGrid()}>reset grid</button>
                    <button onClick={() => this.resetWall()}>reset walls</button>
                    <button onClick={() => this.helperAstar()}>Astar</button>
                    <button onClick={() => this.helperDikjstras()}>Dikjstras</button>
                    <button onClick={() => this.mouseStrat2 = new StartEndStrat(this)}>startendstrat</button>
                    <button onClick={() => this.mouseStrat2 = new WallStrat(this)}>wallstrat</button>
                    <button onClick={() => this.toggleDiagonal()}>diagonals</button>
                    <a href="http://patgiok.azurewebsites.net/"><button>Home</button></a>
                </div>
                <div className="grid-container">
                    {this.mapGrid()}
                </div>
            </React.Fragment>
        );
    }
}


//return array of all nodes in 1d array
export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// sorts input array of nodes by their distance
export function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// if both distance equal, first condition is 0 and considered false, then second part of condition is executed.
export function sortNodesByDistanceThenHcost(unvisitedNodes) {
    unvisitedNodes.sort(function (nodeA, nodeB) {
        return nodeA.distance - nodeB.distance || nodeA.Hcost - nodeB.Hcost

    })
}


// takes too long, has to check every node
// export function getUnvisitedNeighbors3(nodes, currentNode) {
//     console.log('getUnvisitedNeighbors3');
//     console.log(nodes);
//     // console.log(currentNode);
//     const { row, col, } = currentNode;
//     let neighbors = [];
//     neighbors = nodes.filter(
//         function (node) {
//             return !node.isVisited && dist(node, row, col) == 1.0

//             // return !node.isVisited && dist(node, row, col) == 1.4
//         })
//     console.log(neighbors);
//     return neighbors;
// }
// function dist(n, r, c) {
//     let num = Math.sqrt(Math.pow(n.row - r, 2) + Math.pow(n.col - c, 2))
//     num = num.toFixed(1);
//     console.log(num);
//     return num;
// }