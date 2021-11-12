import PathfindingVisualizer from "./PathfindingVisualizer";
// import { START_NODE_ROW, START_NODE_COL } from "./PathfindingVisualizer";
import getNewGridWithWallToggled from "./PathfindingVisualizer";

let mouseRow = 1;
let mouseCol = 1;
let originalNodeCol = null;
let originalNodeRow = null;
let mouseStartNode = false;
let mouseEndNode = false;

export class StartEndStrat {
    handleMouseDown(row, col) {
        window.PathfindingVisualizer.setState({ mouseLeftDown: true });
        // console.log(originalNode);
        if (window.PathfindingVisualizer.state.grid[row][col].startnode) {
            originalNodeCol = col;
            originalNodeRow = row;
            mouseStartNode = true;
            // console.log(mouseStartNode);
        }

        console.log(`mouse: ${mouseStartNode} , state:  ${window.PathfindingVisualizer.state.mouseLeftDown}`);
    }

    handleMouseEnter(row, col) {

        // console.log(`startend strat row:${row} col:${col}`);
        mouseRow = row;
        mouseCol = col;
        // console.log(`mouse: ${mouseStartNode} , state:  ${window.PathfindingVisualizer.state.mouseLeftDown}`);
    }

    handleMouseUp(row, col) {



        if (mouseStartNode) {
            const gred = window.PathfindingVisualizer.state.grid.slice();
            // console.log(window.PathfindingVisualizer.state.grid[originalNodeRow][originalNodeCol]);
            // window.PathfindingVisualizer.state.grid[originalNodeRow][originalNodeCol].startnode = false;
            // window.PathfindingVisualizer.state.grid[row][col].startnode = true;
            gred[originalNodeRow][originalNodeCol].startnode = false;
            gred[row][col].startnode = true;

            mouseStartNode = false;
            // window.PathfindingVisualizer.state.START_NODE_COL = col;
            // window.PathfindingVisualizer.state.START_NODE_ROW = row;
            window.PathfindingVisualizer.setState({ grid: gred, mouseLeftDown: false, START_NODE_COL: col, START_NODE_ROW: row });
        }
        // mouseEndNode = false;
        console.log(window.PathfindingVisualizer.START_NODE_COL, window.PathfindingVisualizer.START_NODE_ROW);
        console.log(`mouse: ${mouseStartNode} , state:  ${window.PathfindingVisualizer.state.mouseLeftDown}`);
        // console.log(mouseStartNode);
    }
}

export class WallStrat {
    handleMouseDown(row, col) {
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({ grid: newGrid, mouseLeftDown: true });
    }

    handleMouseEnter(row, col) {
        // console.log('wallstrat');
        // console.log(window.PathfindingVisualizer.state.mouseLeftDown);
        if (!window.PathfindingVisualizer.state.mouseLeftDown) return;
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({ grid: newGrid });

        // console.log(window.PathfindingVisualizer.state.mouseLeftDown);
    }

    handleMouseUp(row, col) {
        window.PathfindingVisualizer.setState({ mouseLeftDown: false });
    }
}