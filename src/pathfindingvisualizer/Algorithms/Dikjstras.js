import { getAllNodes, getUnvisitedNeighbors2, getUnvisitedNeighbors, sortNodesByDistance } from "../PathfindingVisualizer";

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm


export function Dikjstras(grid, startNode, endNode) {
    console.log("start dikjstra");
    // console.log(startNode.isVisited);
    // console.log(grid);

    const visitedNodes = [];

    // 1. Mark all nodes unvisited(already default) Create set of all unvisited
    const unvisitedNodes = getAllNodes(grid);
    // console.log(unvisitedNodes);

    // 2. Set initial node distance to 0, rest to infinity (already default)
    startNode.distance = 0;

    // !! = cast to boolean
    while (!!unvisitedNodes.length) {
        console.log("DikjstraWhile");

        sortNodesByDistance(unvisitedNodes);
        const currentNode = unvisitedNodes.shift();
        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
        // 3. Calculate distance of all unvisited neighbor nodes through currentNode
        //    compare new distance with assigned distance, assign smaller distance.

        updateNeighbors(grid, currentNode);
        // 4. Mark currentNode visted, remove from unvisited set.
        // unvisitedNodes.shift();
        visitedNodes.push(currentNode);

        // 5. if endNode is visited or smallest distance of unvisited nodes is infinite
        //    stop algo
        if (endNode.isVisited) return visitedNodes;

        // sortNodesByDistance(unvisitedNodes);
        updateNeighbors(grid, currentNode);
        // if (unvisitedNodes.length || unvisitedNodes[0].distance == Infinity) return visitedNodes;

        // 6. select unvisited node with lowest distance, set to current node
        //    loop back to step 3
        // console.log(grid);
    }
}

function updateNeighbors(grid, currentNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
    // const unvisitedNeighbors = getUnvisitedNeighbors2(grid, currentNode);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = currentNode.distance + 1; //neighbor dist always greater
        if (neighbor.previousNode == null) {
            neighbor.previousNode = currentNode;
        }
    }


}

