import React from "react";
import Node from "./Node";
import "./PathfindingVisualizer.css";

const GRID_ROW_LENGTH = 5;
const GRID_COLUMN_LENGTH = 5;

// React uses JSX not plain javascript, first letter of tag indicates elements. 
// Uppercase used to specify react components; ie cant camelCase.
export default class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: []
        };
    }

    componentDidMount() {
        this.resetGrid();
    }

    resetGrid() {
        const grid = [];
        for (let i = 0; i < GRID_ROW_LENGTH; i++) {
            let currentRow = [];
            for (let j = 0; j < GRID_COLUMN_LENGTH; j++) {
                currentRow.push([]);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    render() {
        
        const {grid} = this.state;

        return (
            <React.Fragment>

                <div className="grid-container">
                    {grid.map((row, rowId) => {
                        return (
                            <div key={rowId}>
                                {row.map((node, nodeId) => {
                                    return <Node key={nodeId}></Node>
                                })}
                            </div>
                        )

                    })

                    }
                </div>
            </React.Fragment>

        );
    }
}