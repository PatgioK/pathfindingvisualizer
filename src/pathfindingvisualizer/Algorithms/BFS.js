export function BFS(grid, startNode, diagonalPathing) {
    const visitedNodes = [];
    const openList = [];
    openList.push(startNode);

    while (!!openList.length) {
        const currentNode = openList.shift();
        visitedNodes.push(currentNode);
        if (currentNode.endnode) break;
        if (currentNode.isWall) continue;

        const unvisitedNeighbors = window.PathfindingVisualizer.getUnvisitedNeighbors(grid, currentNode);
        // console.log(unvisitedNeighbors);
        for (const neighbor of unvisitedNeighbors) {
            if(neighbor.isWall) continue;
            openList.push(neighbor);
            if (neighbor.previousNode == null) {
                neighbor.previousNode = currentNode;
            }
            neighbor.isVisited = true;
        }

        const unvisitedNeighborsDiag = window.PathfindingVisualizer.getUnvisitedNeighborsDiag(grid, currentNode);
        for (const neighbor of unvisitedNeighborsDiag) {
            if(neighbor.isWall) continue;
            openList.push(neighbor);
            if (neighbor.previousNode == null) {
                neighbor.previousNode = currentNode;
            }
            neighbor.isVisited = true;
        }
    }
    startNode.previousNode = null;
    return visitedNodes;

}