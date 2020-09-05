import React from "react";

const cellStyles: React.CSSProperties = {
    width: "calc(100% / 20)",
    height: "calc(100% / 20)",
    border: "1px solid black",
};

type CellProps = {
    isAlive: boolean;
    coord: [number, number];
    dispatch: React.Dispatch<{
        type: "TOGGLE_PAINT";
        payload: [number, number];
    }>;
};

function Cell({ isAlive, coord, dispatch }: CellProps) {
    const color = isAlive ? "green" : "transparent";
    return (
        <div
            onClick={() =>
                dispatch({
                    type: "TOGGLE_PAINT",
                    payload: [coord[0], coord[1]],
                })
            }
            style={{ ...cellStyles, ...{ backgroundColor: color } }}
        ></div>
    );
}

export default Cell;
