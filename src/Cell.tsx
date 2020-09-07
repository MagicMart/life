import React from "react";

const cellStyles: React.CSSProperties = {
    width: "calc(100% / 20)",
    height: "calc(100% / 20)",
    outline: "1px solid black",
};

interface CellProps {
    isAlive: boolean;
    coord: [number, number];
    dispatch: React.Dispatch<{
        type: "TOGGLE_PAINT";
        payload: [number, number];
    }>;
}

function Cell({ isAlive, coord, dispatch }: CellProps) {
    const color = isAlive ? "green" : "transparent";
    console.log("cell");
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

export default React.memo(
    Cell,
    (prevProps, nextProps) => prevProps.isAlive === nextProps.isAlive
);
