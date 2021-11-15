import { getAllNodes, sortNodesByDistance, sortNodesByDistanceThenHcost } from "../PathfindingVisualizer";
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

        updateNeighbors(grid, currentNode, diagonalPathing);

        visitedNodes.push(currentNode);
    }
}


function updateNeighbors(grid, currentNode, diagonalPathing) {
    // console.log('astar updateneighbors');

    const unvisitedNeighbors = window.PathfindingVisualizer.getUnvisitedNeighbors(grid, currentNode);
    for (const neighbor of unvisitedNeighbors) {
        let curG = currentNode.Gcost + 1;
        // let neiG = neighbor.Gcost;
        // neighbor.Gcost = neiG > curG ? curG : neiG;
        let curH = 0;
        if (diagonalPathing) {
            curH = Octile(neighbor, 5);
        } else {
            curH = Manhattan(neighbor);
        }
        // curH = Manhattan(neighbor);
        if (curG + curH < neighbor.distance) {
            neighbor.distance = Math.round(curG + curH);
            neighbor.previousNode = currentNode;
            neighbor.Hcost = curH;
            neighbor.Gcost = curG;
        }
    }

    if (diagonalPathing) {
        const unvisitedNeighborsDiag = window.PathfindingVisualizer.getUnvisitedNeighborsDiag(grid, currentNode);
        for (const neighbor of unvisitedNeighborsDiag) {
            let curG = currentNode.Gcost + 1.4;
            let curH = Octile(neighbor, 5);
            neighbor.Hcost = curH;
            // let curH = Manhattan(neighbor);
            if (curG + curH < neighbor.distance) {
                if(neighbor.Gcost > curG)neighbor.Gcost = curG;
                let dist = Math.round(curG + curH);
                if(dist < neighbor.distance) {
                neighbor.distance = dist
                neighbor.previousNode = currentNode;
                }
            }
        }
    }
    return;
}