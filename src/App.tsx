import React from "react";
import Cell from "./Cell";

const matrixInitializer = () =>
    Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => 0));

const matrixContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "300px",
    height: "300px",
    border: "1px solid black",
};

function App() {
    const [matrix, setMatrix] = React.useState(matrixInitializer);
    return (
        <div>
            <h1>Game of Life</h1>
            <div style={matrixContainer}>
                {matrix.map((row) =>
                    row.map((num) => {
                        return <Cell isAlive={num === 1 ? true : false} />;
                    })
                )}
            </div>
        </div>
    );
}

export default App;
