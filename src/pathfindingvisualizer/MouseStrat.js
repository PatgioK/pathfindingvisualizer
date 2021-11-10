// import PathfindingVisualizer from "./PathfindingVisualizer";
import getNewGridWithWallToggled from "./PathfindingVisualizer";


export class StartEndStrat {
    handleMouseDown(row, col) {
        // this.setState({ mouseLeftDown: true });   
        // console.log(this.comp.state);
        // window.PathfindingVisualizer.setState({mouseLeftDown : true});
        // console.log(window.PathfindingVisualizer.helperDikjstra());
        // window.PathfindingVisualizer.setState({mouseLeftDown: true});
        // console.log(window.PathfindingVisualizer);
        // window.PathfindingVisualizer.resetGrid();
    }

    handleMouseEnter(row, col) {
        console.log('start end strat');
        // console.log(window.PathfindingVisualizer);
    }

    handleMouseUp(row, col) {
        // window.PathfindingVisualizer.setState({ mouseLeftDown: false });
        // console.log(window.PathfindingVisualizer.state.mouseLeftDown);
    }
}

export class WallStrat {
    handleMouseDown(row, col) {
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({grid: newGrid, mouseLeftDown: true});
    }

    handleMouseEnter(row, col) {
        console.log('wallstrat');
        // console.log(window.PathfindingVisualizer.state.mouseLeftDown);
        if (!window.PathfindingVisualizer.state.mouseLeftDown) return;
        const newGrid = window.PathfindingVisualizer.getNewGridWithWallToggled(window.PathfindingVisualizer.state.grid, row, col);
        window.PathfindingVisualizer.setState({grid: newGrid});

        // console.log(window.PathfindingVisualizer.state.mouseLeftDown);
    }

    handleMouseUp(row, col) {
        window.PathfindingVisualizer.setState({ mouseLeftDown: false });
    }
}