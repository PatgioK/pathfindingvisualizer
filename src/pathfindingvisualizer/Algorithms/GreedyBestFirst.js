import { getAllNodes } from "../PathfindingVisualizer";
import { Manhattan, Octile, } from "../Heuristics";
import { buildMinHeap, heapUnshift } from "../heap";

// using var node.distance for node.hcost to reuse heap functions.
export function GreedyBestFirst(grid, startNode, endNode, diagonalPathing) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);

    buildMinHeap(unvisitedNodes);
    startNode.distance = 0;

    while (!!unvisitedNodes.length) {
        buildMinHeap(unvisitedNodes);
        const currentNode = heapUnshift(unvisitedNodes);

        // if all nodes distance is infinity, we are stuck
        if (currentNode.distance === Infinity) return visitedNodes;
        if (currentNode.isWall) continue;

        currentNode.isVisited = true;
        if (endNode.isVisited) return visitedNodes;

        updateNeighbors(grid, currentNode, diagonalPathing);
        visitedNodes.push(currentNode);
    }
}

function updateNeighbors(grid, currentNode, diagonalPathing) {
    const unvisitedNeighbors = window.PathfindingVisualizer.getUnvisitedNeighbors(grid, currentNode);

    for (const neighbor of unvisitedNeighbors) {
        let h = 0
        if (!neighbor.isOpen) 
            neighbor.isOpen = true;
        
        if (!diagonalPathing)
            h = Manhattan(neighbor);
        else
            h = Octile(neighbor, 1);

        if (h < neighbor.distance) {
            neighbor.distance = h;
            neighbor.previousNode = currentNode;
        }
    }

    if (diagonalPathing) {
        const unvisitedNeighborsDiag = window.PathfindingVisualizer.getUnvisitedNeighborsDiag(grid, currentNode);
        for (const neighbor of unvisitedNeighborsDiag) {
            let h = 0
            if (!neighbor.isOpen) {
                neighbor.isOpen = true;
                neighbor.previousNode = currentNode;
            }
            h = Octile(neighbor, 1)

            if (h < neighbor.distance) {
                neighbor.distance = h;
            }
        }
    }
    return;
}

export function sortNodesByHcost(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.Hcost - nodeB.Hcost);
}