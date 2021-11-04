import React from "react";
import Node from "./Node";
import "./PathfindingVisualizer.css";

const GRID_ROW_LENGTH = 50;
const GRID_COLUMN_LENGTH = 20;

// React uses JSX not plain javascript, first letter of tag indicates elements. 
// Uppercase used to specify react components; ie cant camelCase.
export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: []
        }
    }

    componentDidMount() {
        this.resetGrid();
    }

    resetGrid() {
        const grid = [];
        for (let i = 0; i < GRID_ROW_LENGTH; i++) {
            currentRow = [];
            for (let j = 0; j < GRID_COLUMN_LENGTH; j++) {
                currentRow.push(newNode());
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    render() {
        return (
            <React.Fragment>

                <div className="grid-container">
                {/* {grid.map((row, col) => ) */}

                }
                </div>
            </React.Fragment>

        );
    }
}