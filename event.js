let currentPlayer;
let whiteCount;
let blackCount;

function generate() {
    const board = document.querySelector("table");
    board.innerHTML = "";
    currentPlayer = 1;
    whiteCount = 0;
    blackCount = 0;
    document.getElementById("playerText").innerText = "1. Játékos: ⚪";

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

            if (content == 0) {
                const circle = document.createElement("img");
                circle.src = "circle.png";
                circle.className = "circle";
                cell.appendChild(circle);
                cell.addEventListener("click", function() {
                    place(cell);
                });
            } else if (content == 1) {
                const line = document.createElement("img");
                line.src = "horizontal-line.png";
                line.className = "line";
                cell.appendChild(line);
            } else if (content == 2) {
                const line = document.createElement("img");
                line.src = "vertical-line.png";
                line.className = "line";
                cell.appendChild(line);
            }

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}

function place(cell) {
    if (whiteCount >= 9 && blackCount >= 9) {
        alert("Lerakás vége");
        return;
    }

    if (cell.querySelector(".piece")) return;

    const img = document.createElement("img");
    img.className = "piece";

    if (currentPlayer == 1) {
        img.src = "white.png";
        whiteCount++;
        document.getElementById("ketto").innerText = "1. Lerakható még: " + (9 - whiteCount);
        currentPlayer = 2;
        document.getElementById("playerText").innerText = "2. Játékos: ⚫";
    } else {
        img.src = "black.png";
        blackCount++;
        document.getElementById("egy").innerText = "2. Lerakható még: " + (9 - blackCount);
        currentPlayer = 1;
        document.getElementById("playerText").innerText = "1. Játékos: ⚪";
    }

    if (whiteCount >= 9 && blackCount >= 9) {
        alert("Lerakás vége");
    }

    cell.innerHTML = "";
    cell.appendChild(img);
}
