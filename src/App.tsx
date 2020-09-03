import React from "react";
import Cell from "./Cell";

const matrix = Array.from({ length: 20 }, () =>
    Array.from({ length: 20 }, () => 0)
);

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
};

const matrixContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "300px",
    height: "300px",
    border: "1px solid black",
    margin: "0 auto",
};

const appReducer = (
    state: number[][],
    action: { type: string; payload: [number, number] }
) => {
    const [row, col] = action.payload;
    switch (action.type) {
        case "TOGGLE": {
            const newState = state.map((row) => row.slice());
            newState[row][col] = newState[row][col] === 0 ? 1 : 0;
            return [...newState];
        }
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = React.useReducer(appReducer, matrix);

    return (
        <div style={container}>
            <h1>Game of Life</h1>
            <div style={matrixContainer}>
                {state.map((row, i) =>
                    row.map((num, j) => {
                        return (
                            <Cell
                                key={`${[i, j]}`}
                                coord={[i, j]}
                                dispatch={dispatch}
                                isAlive={num === 1 ? true : false}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default App;
