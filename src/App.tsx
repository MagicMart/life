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
    ticking: boolean;
    speed: number;
};

type Action =
    | {
          type: "TOGGLE_PAINT";
          payload: [number, number];
      }
    | { type: "CLICK"; payload: number[][] }
    | {
          type: "IS_TICKING";
          payload: boolean;
      };

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "TOGGLE_PAINT": {
            const [row, col] = action.payload;
            const matrix = state.matrix.map((arr) => arr.slice());
            matrix[row][col] = matrix[row][col] === 0 ? 1 : 0;
            return { ...state, matrix };
        }
        case "IS_TICKING": {
            return { ...state, ticking: !state.ticking };
        }
        case "CLICK": {
            return { ...state, matrix: action.payload };
        }
        default:
            throw new Error(`Unknown action type`);
    }
};

function App() {
    const [state, dispatch] = React.useReducer(appReducer, {
        matrix,
        ticking: false,
        speed: 200,
    });
    const timerID: { current: number | undefined } = React.useRef();

    React.useEffect(() => {
        console.log("use effect");
        if (!state.ticking) return;
        timerID.current = window.setTimeout(
            () =>
                dispatch({
                    type: "CLICK",
                    payload: lifeOrDeath(state.matrix),
                }),
            state.speed
        );

        return () => window.clearTimeout(timerID.current);
    }, [state.matrix, state.ticking, state.speed]);

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
                            type: "IS_TICKING",
                            payload: !state.ticking,
                        })
                    }
                    className="myButton"
                    style={
                        state.ticking
                            ? { background: "red" }
                            : { background: "green" }
                    }
                >
                    Tick
                </button>
            </div>
        </div>
    );
}

export default App;
