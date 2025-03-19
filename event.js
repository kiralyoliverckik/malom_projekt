function generate() {
    const board = document.querySelector("table");
    board.innerHTML = "";

    const table = [
        [0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0],
        [1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 1],
        [1, 4, 0, 2, 2, 0, 2, 2, 0, 4, 1],
        [1, 4, 1, 4, 4, 1, 4, 4, 1, 4, 1],
        [1, 4, 1, 4, 0, 0, 0, 4, 1, 4, 1],
        [0, 2, 0, 2, 0, 4, 0, 2, 0, 2, 0],
    ];

    gen_table(board, table);
}

function gen_table(board, table) {
    for (let i = 0; i < 11; i++) {
        const row = document.createElement("tr");

        let rowData = [];
        if (i < 6) { rowData = table[i]; } 
        else { rowData = table[11 - i - 1]; }

        for (let j = 0; j < 11; j++) {
            const cell = document.createElement("td");
            const content = rowData[j];

            if (content === 0) {
                // Pont (◯) képként
                const circle = document.createElement("img");
                circle.src = "circle.png"; // Kör kép
                circle.className = "circle";
                cell.appendChild(circle);
                cell.addEventListener("click", function() {
                    place();
                });
            } else if (content === 1) {
                // Vízszintes vonal (─)
                const line = document.createElement("img");
                line.src = "horizontal-line.png"; // Vízszintes vonal képe
                line.className = "line";
                cell.appendChild(line);
            } else if (content === 2) {
                // Függőleges vonal (│)
                const line = document.createElement("img");
                line.src = "vertical-line.png"; // Függőleges vonal képe
                line.className = "line";
                cell.appendChild(line);
            }

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}

function place() {
    console.log("hawk tuah!");
}