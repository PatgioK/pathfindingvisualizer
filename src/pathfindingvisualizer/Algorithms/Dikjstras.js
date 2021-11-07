import { getAllNodes, getUnvisitedNeighbors, sortNodesByDistance } from "../PathfindingVisualizer";

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

        sortNodesByDistance(unvisitedNodes);
        const currentNode = startNode;
        // 3. Calculate distance of all unvisited neighbor nodes through currentNode
        //    compare new distance with assigned distance, assign smaller distance.

        const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = currentNode.distance + 1; //neighbor dist always greater
            neighbor.previousNode = currentNode;
        }

        // 4. Mark currentNode visted, remove from unvisited set.
        currentNode.isVisited = true;
        unvisitedNodes.shift();

        // 5. if endNode is visited or smallest distance of unvisited nodes is infinite
        //    stop algo
        if (endNode.isVisited) return;

        sortNodesByDistance(unvisitedNodes);
        if (unvisitedNodes.length || unvisitedNodes[0].distance == Infinity) return;

        // 6. select unvisited node with lowest distance, set to current node
        //    loop back to step 3


        // console.log(grid);

    }
}