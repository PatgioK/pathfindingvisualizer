import { getAllNodes, getUnvisitedNeighbors, getUnvisitedNeighborsDiag, sortNodesByDistance, sortNodesByDistanceThenHcost } from "../PathfindingVisualizer";
import { Manhattan, Octile, } from "../Heuristics";

// Gcost = distance from starting node
// Hcost (heuristic) = distance from end node
// Fcost = Gcost + Hcost (using distance var)


export function Astar(grid, startNode, endNode, diagonalPathing) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);

    startNode.distance = 0;
    startNode.Gcost = 0;

    while (!!unvisitedNodes.length) {
        sortNodesByDistanceThenHcost(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // if all nodes distance is infinity, we are stuck
        if (currentNode.distance === Infinity) return visitedNodes;
        if (currentNode.isWall) continue;

        currentNode.isVisited = true;
        if (endNode.isVisited) return visitedNodes;

        updateNeighbors(grid, currentNode);

        visitedNodes.push(currentNode);
    }
}


function updateNeighbors(grid, currentNode) {
    console.log('astar updateneighbors');

    const unvisitedNeighbors = window.PathfindingVisualizer.getUnvisitedNeighbors(grid, currentNode);
    for(const neighbor of unvisitedNeighbors) {
        let curG = currentNode.Gcost + 1;
        let neiG = neighbor.Gcost;
        neighbor.Gcost = neiG > curG ? curG : neiG;
        if(neighbor.Hcost = Infinity) neighbor.Hcost = Octile(currentNode);
        // if(neighbor.Hcost = Infinity) neighbor.Hcost = Manhattan(currentNode);
        
        // console.log(neighbor.Hcost);
        let dist = neighbor.Gcost + neighbor.Hcost;
        console.log(dist);
        neighbor.distance = dist;
        // console.log(neighbor.distance);
        if (neighbor.previousNode == null) {
            neighbor.previousNode = currentNode;
        }
    }

    return;
}