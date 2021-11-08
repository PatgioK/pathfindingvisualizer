
export class MouseStrat {

}


export class StartEndStrat extends MouseStrat {
    handleMouseDown(row, col) {
        this.setState({ mouseLeftDown: true });
    }

    handleMouseEnter(row, col) {
        console.log('start end strat');
    }

    handleMouseUp(row, col) {
        this.setState({ mouseLeftDown: false });
    }
}

export class WallStrat extends MouseStrat {
    handleMouseDown(row, col) {
        this.setState({ mouseLeftDown: true });
    }

    handleMouseEnter(row, col) {
        console.log('wallstrat');
    }

    handleMouseUp(row, col) {
        this.setState({ mouseLeftDown: false });
    }
}