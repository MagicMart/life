import React from "react";
import Cell from "./Cell";
import { lifeOrDeath, Matrix } from "./lifeOrDeath";

// the range slider values.
// the speed (setInterval ms) mirrors its values
const MAX_RANGE = 900;
const MIN_RANGE = 100;
const MID_RANGE = (MAX_RANGE + MIN_RANGE) / 2;
const STEP = MIN_RANGE;
const GRID_SIZE = 20;

const matrix: Matrix = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0)
);

const matrixContainer: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_SIZE}, var(--cell-size))`,
    outline: "2px solid black",
    margin: "0 auto",
};

interface AppState {
    matrix: Matrix;
    ticking: boolean;
    speed: number;
    range_value: number;
}

type Action =
    | {
          type: "TOGGLE_PAINT";
          payload: [number, number];
      }
    | { type: "LIFE_OR_DEATH" }
    | { type: "TOGGLE_TICKING" }
    | { type: "SET_RANGE_VALUE_&_SPEED"; payload: number };

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "TOGGLE_PAINT": {
            const [row, col] = action.payload;
            const matrix = state.matrix.map((arr) => arr.slice());
            matrix[row][col] = matrix[row][col] === 0 ? 1 : 0;
            return { ...state, matrix };
        }
        case "TOGGLE_TICKING": {
            return { ...state, ticking: !state.ticking };
        }
        case "LIFE_OR_DEATH": {
            const newMatrix = lifeOrDeath(state.matrix);
            if (state.matrix.toString() === newMatrix.toString())
                return { ...state, ticking: false };
            return { ...state, matrix: newMatrix };
        }

        case "SET_RANGE_VALUE_&_SPEED": {
            return {
                ...state,
                range_value: action.payload,
                // the speed value mirrors the range value
                speed: MIN_RANGE + MAX_RANGE - action.payload,
            };
        }
        default:
            throw new Error(`Unknown action type`);
    }
};

function App() {
    const [state, dispatch] = React.useReducer(appReducer, {
        matrix,
        ticking: false,
        speed: MID_RANGE,
        range_value: MID_RANGE,
    });
    const timerID: { current: number | undefined } = React.useRef();

    React.useEffect(() => {
        console.log("use effect");
        if (!state.ticking) return;
        timerID.current = window.setInterval(
            () =>
                dispatch({
                    type: "LIFE_OR_DEATH",
                }),
            state.speed
        );

        return function () {
            console.log("cleared");
            window.clearInterval(timerID.current);
        };
    }, [state.ticking, state.speed]);

    return (
        <div className="container">
            <h1 style={{ color: "red", marginBottom: "0" }}>Game of Life</h1>
            <p style={{ color: "white" }}>
                Make a shape. Then click on{" "}
                <span style={{ background: "green" }}>Tick</span>
            </p>
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
                            type: "TOGGLE_TICKING",
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
                    min={MIN_RANGE}
                    max={MAX_RANGE}
                    step={STEP}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_RANGE_VALUE_&_SPEED",
                            payload: Number(e.target.value),
                        })
                    }
                    value={state.range_value}
                    className="slider"
                    id="myRange"
                    aria-label="change speed"
                />
            </div>
        </div>
    );
}

export default App;
