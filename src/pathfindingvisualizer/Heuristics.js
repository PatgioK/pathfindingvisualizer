

export function Manhattan(node) {
    // console.log('start manhattan');
    let dx = Math.abs(node.col - window.PathfindingVisualizer.state.END_NODE_COL);
    // console.log(window.PathfindingVisualizer.state.END_NODE_COL)
    let dy = Math.abs(node.row - window.PathfindingVisualizer.state.END_NODE_ROW);
    // console.log(dy);
    return (dx + dy);
}

export function Octile(node, weight) {
    
    let dx = Math.abs(node.col - window.PathfindingVisualizer.state.END_NODE_COL);
    let dy = Math.abs(node.row - window.PathfindingVisualizer.state.END_NODE_ROW);
    return (weight * (Math.sqrt(dx + dy)));
}