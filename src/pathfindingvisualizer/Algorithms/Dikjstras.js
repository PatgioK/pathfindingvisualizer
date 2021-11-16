import { getAllNodes, } from "../PathfindingVisualizer";



// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
export function Dikjstras(grid, startNode, endNode) {
    const visitedNodes = [];

    // 1. Mark all nodes unvisited(already default) Create set of all unvisited
    const unvisitedNodes = getAllNodes(grid);
    // console.log(unvisitedNodes);

    // 2. Set initial node distance to 0, rest to infinity (already default)
    startNode.distance = 0;

    // !! = cast to boolean
    while (!!unvisitedNodes.length) {
        console.log("dijkstra");
        sortNodesByDistance(unvisitedNodes);
        // console.log(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();

        // if all nodes distance is infinity, we are stuck
        if (currentNode.distance === Infinity) return visitedNodes;
        if (currentNode.isWall) continue;

        currentNode.isVisited = true;
        if (endNode.isVisited) return visitedNodes;
        // 3. Calculate distance of all unvisited neighbor nodes through currentNode
        //    compare new distance with assigned distance, assign smaller distance.
        updateNeighbors(grid, currentNode);
        // 4. Mark currentNode visted, remove from unvisited set.
        // unvisitedNodes.shift();
        visitedNodes.push(currentNode);

        // 5. if endNode is visited or smallest distance of unvisited nodes is infinite
        //    stop algo
        // 6. select unvisited node with lowest distance, set to current node
        //    loop back to step 3
        // console.log(grid);
    }
}

function updateNeighbors(grid, currentNode) {
    const unvisitedNeighbors = window.PathfindingVisualizer.getUnvisitedNeighbors(grid, currentNode);
    // const unvisitedNeighbors = getUnvisitedNeighbors2(grid, currentNode);\

    for (const neighbor of unvisitedNeighbors) {
        let nei = neighbor.distance;
        let cur = currentNode.distance + 1;
        neighbor.distance = nei > cur ? cur: nei;
        // neighbor.distance = currentNode.distance + 1; //neighbor dist always greater
        if (neighbor.previousNode == null) {
            neighbor.previousNode = currentNode;
        }
    }

    if(window.PathfindingVisualizer.diagonalPathing) {
        const unvisitedNeighborsDiag = window.PathfindingVisualizer.getUnvisitedNeighborsDiag(grid, currentNode);
        for (const neighbor of unvisitedNeighborsDiag) {
            let nei = neighbor.distance;
            let cur = currentNode.distance + 1.4;
            neighbor.distance = nei > cur ? cur: nei;
            if (neighbor.previousNode == null) {
                neighbor.previousNode = currentNode;
            }
        }
    }
}

// sorts input array of nodes by their distance
export function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

