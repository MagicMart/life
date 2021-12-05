import React from "react";

const cellStyles: React.CSSProperties = {
    width: "var(--cell-size)",
    height: "var(--cell-size)",
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
                ...{
                    backgroundColor: isAlive ? "green" : "var(--cell-bg)",
                },
            }}
        ></div>
    );
}

export default React.memo(
    Cell,
    (prevProps, nextProps) => prevProps.isAlive === nextProps.isAlive
);
