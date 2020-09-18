import React from "react";

const ALIVE_BG = "green";

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
    console.log("cell");
    return (
        <div
            onClick={() =>
                dispatch({
                    type: "TOGGLE_PAINT",
                    payload: [coord[0], coord[1]],
                })
            }
            style={{
                ...cellStyles,
                ...{ backgroundColor: isAlive ? ALIVE_BG : "transparent" },
            }}
        ></div>
    );
}

export default React.memo(
    Cell,
    (prevProps, nextProps) => prevProps.isAlive === nextProps.isAlive
);
