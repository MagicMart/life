import React from "react";

const cellStyles: React.CSSProperties = {
    width: "calc(100% / 20)",
    height: "calc(100% / 20)",
    border: "1px solid black",
};

type CellProps = {
    isAlive: boolean;
};

function Cell({ isAlive }: CellProps) {
    const color = isAlive ? "green" : "transparent";
    return <div style={{ ...cellStyles, ...{ backgroundColor: color } }}></div>;
}

export default Cell;
