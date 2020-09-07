import React from "react";
import Cell from "./Cell";
import { lifeOrDeath } from "./lifeOrDeath";

const matrix = Array.from({ length: 20 }, () =>
    Array.from({ length: 20 }, () => 0)
);

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const matrixContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "300px",
    height: "300px",
    outline: "1px solid black",
    margin: "0 auto",
};

interface AppState {
    matrix: number[][];
    ticking: boolean;
    speed: number;
}

type Action =
    | {
          type: "TOGGLE_PAINT";
          payload: [number, number];
      }
    | { type: "CLICK" }
    | { type: "IS_TICKING" }
    | { type: "SPEED"; payload: number };

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
            const newMatrix = lifeOrDeath(state.matrix);
            if (state.matrix.toString() === newMatrix.toString())
                return { ...state, ticking: false };
            return { ...state, matrix: newMatrix };
        }
        case "SPEED": {
            return { ...state, speed: action.payload };
        }
        default:
            throw new Error(`Unknown action type`);
    }
};

function App() {
    const [state, dispatch] = React.useReducer(appReducer, {
        matrix,
        ticking: false,
        speed: 500,
    });
    const timerID: { current: number | undefined } = React.useRef();

    React.useEffect(() => {
        console.log("use effect");
        if (!state.ticking) return;
        timerID.current = window.setInterval(
            () =>
                dispatch({
                    type: "CLICK",
                }),
            state.speed
        );

        return function () {
            console.log("cleared");
            window.clearInterval(timerID.current);
        };
    }, [state.ticking, state.speed]);

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
            <div style={{ display: "flex", marginTop: "20px" }}>
                <button
                    onClick={() =>
                        dispatch({
                            type: "IS_TICKING",
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

                <input
                    type="range"
                    min="100"
                    max="900"
                    step="10"
                    onChange={(e) =>
                        dispatch({
                            type: "SPEED",
                            payload: Number(e.target.value),
                        })
                    }
                    value={state.speed}
                    className="slider"
                    id="myRange"
                />
            </div>
        </div>
    );
}

export default App;
