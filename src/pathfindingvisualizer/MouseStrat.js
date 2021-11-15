// import PathfindingVisualizer from "./PathfindingVisualizer";
import getNewGridWithWallToggled from "./PathfindingVisualizer";

// add user-select: none; to App.css; .App css to fix dragging out of div bug, trying to drag its text

// current mouse coords
// let mouseRow = 1;
// let mouseCol = 1;
// mouse coords at click
let originalNodeCol = null;
let originalNodeRow = null;
// flags for which node is clicked
let mouseStartNode = false;
let mouseEndNode = false;

let drawingWalls = false;

export class GeneralStrat {

    handleMouseDown(row, col) {
        if (window.PathfindingVisualizer.state.grid[row][col].startnode) {
            mouseStartNode = true;
        } else if (window.PathfindingVisualizer.state.grid[row][col].endnode) {
            mouseEndNode = true;
        } else {
            drawingWalls = true;
            const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
            window.PathfindingVisualizer.setState({ grid: newGrid });
        }
        originalNodeCol = col;
        originalNodeRow = row;
        window.PathfindingVisualizer.setState({ mouseLeftDown: true });
        console.log(`mouse: ${mouseStartNode} , state:  ${window.PathfindingVisualizer.state.mouseLeftDown}`);
    }

    handleMouseEnter(row, col) {
        if (!window.PathfindingVisualizer.state.mouseLeftDown) return;
        if (drawingWalls) {
            const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
            window.PathfindingVisualizer.setState({ grid: newGrid });
        }

    }

    handleMouseUp(row, col) {
        if (mouseEndNode) {
            const gred = window.PathfindingVisualizer.state.grid.slice();
            gred[originalNodeRow][originalNodeCol].endnode = false;
            gred[row][col].endnode = true;
            window.PathfindingVisualizer.setState({ grid: gred, mouseLeftDown: false, END_NODE_COL: col, END_NODE_ROW: row });
        }
        if (mouseStartNode) {
            const gred = window.PathfindingVisualizer.state.grid.slice();
            gred[originalNodeRow][originalNodeCol].startnode = false;
            gred[row][col].startnode = true;
            window.PathfindingVisualizer.setState({ grid: gred, mouseLeftDown: false, START_NODE_COL: col, START_NODE_ROW: row });
        }
        window.PathfindingVisualizer.setState({ mouseLeftDown: false });
        mouseEndNode = false;
        mouseStartNode = false;
        drawingWalls = false;
    }

}

export class StartEndStrat {
    handleMouseDown(row, col) {
        // console.log(originalNode);
        if (window.PathfindingVisualizer.state.grid[row][col].startnode) {
            mouseStartNode = true;
            // console.log(mouseStartNode);
        }
        if (window.PathfindingVisualizer.state.grid[row][col].endnode) {
            mouseEndNode = true;
            // console.log(mouseStartNode);
        }

        originalNodeCol = col;
        originalNodeRow = row;
        window.PathfindingVisualizer.setState({ mouseLeftDown: true });
        console.log(`mouse: ${mouseStartNode} , state:  ${window.PathfindingVisualizer.state.mouseLeftDown}`);
    }

    handleMouseEnter(row, col) {

    }

    handleMouseUp(row, col) {
        if (mouseEndNode) {
            const gred = window.PathfindingVisualizer.state.grid.slice();
            gred[originalNodeRow][originalNodeCol].endnode = false;
            gred[row][col].endnode = true;
            window.PathfindingVisualizer.setState({ grid: gred, mouseLeftDown: false, END_NODE_COL: col, END_NODE_ROW: row });
        }
        if (mouseStartNode) {
            const gred = window.PathfindingVisualizer.state.grid.slice();
            gred[originalNodeRow][originalNodeCol].startnode = false;
            gred[row][col].startnode = true;
            window.PathfindingVisualizer.setState({ grid: gred, mouseLeftDown: false, START_NODE_COL: col, START_NODE_ROW: row });
        }
        window.PathfindingVisualizer.setState({ mouseLeftDown: false });
        mouseEndNode = false;
        mouseStartNode = false;
    }
}

export class WallStrat {
    handleMouseDown(row, col) {
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({ grid: newGrid, mouseLeftDown: true });
    }

    handleMouseEnter(row, col) {
        if (!window.PathfindingVisualizer.state.mouseLeftDown) return;
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({ grid: newGrid });
    }

    handleMouseUp(row, col) {
        window.PathfindingVisualizer.setState({ mouseLeftDown: false });
    }
}