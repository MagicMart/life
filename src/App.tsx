import React from "react";
import Cell from "./Cell";
import { lifeOrDeath } from "./lifeOrDeath";

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

type AppState = {
    matrix: number[][];
};

type Action =
    | {
          type: "TOGGLE";
          payload: [number, number];
      }
    | { type: "CLICK"; payload: number[][] };

const appReducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case "TOGGLE": {
            const [row, col] = action.payload;
            const matrix = state.matrix.map((arr) => arr.slice());
            matrix[row][col] = matrix[row][col] === 0 ? 1 : 0;
            return { ...state, matrix };
        }
        case "CLICK": {
            return { ...state, matrix: action.payload };
        }
        default:
            throw new Error(`Unknown action type`);
    }
};

function App() {
    const [state, dispatch] = React.useReducer(appReducer, { matrix });

    return (
        <div style={container}>
            <h1>Game of Life</h1>
            <div style={matrixContainer}>
                {state.matrix.map((row, i) =>
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
            <div>
                <button
                    onClick={() =>
                        dispatch({
                            type: "CLICK",
                            payload: lifeOrDeath(state.matrix),
                        })
                    }
                    className="myButton"
                >
                    Tick
                </button>
            </div>
        </div>
    );
}

export default App;
