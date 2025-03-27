let currentPlayer;
let whiteCount;
let blackCount;
let selectedPiece;
let alerttriggered = false;
let positions = [
    [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 2, 1, 1, 2, 1, 1, 2, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1],
    [2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2],
    [1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 2, 1, 1, 2, 1, 1, 2, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
]


function generate() {
    alerttriggered = false;
    const board = document.querySelector("table");
    board.innerHTML = "";
    document.querySelector("input").value = "Reset";
    currentPlayer = 1;
    whiteCount = 0;
    blackCount = 0;
    document.getElementById("playerText").innerText = "1. Játékos: ⚪";
    document.getElementById("egy").innerText = "1. Lerakható ⚪ még: " + 9;
    document.getElementById("ketto").innerText = "2. Lerakható ⚫ még: " + 9;

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


function move(cell) {
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;

        if ((currentPlayer == 1 && positions[row][col] == 5) || (currentPlayer == 2 && positions[row][col] == 7)) {
            console.log("selected" + row + ", " + col);
            selectedPiece = cell;
            highlightMoves(row, col);
        } else {
            console.log("invalid");
        }
}

function highlightMoves() {
    // [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
    // [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    // [1, 0, 2, 1, 1, 2, 1, 1, 2, 0, 1],
    // [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    // [1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1],
    // [2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2],
    // [1, 0, 1, 0, 2, 2, 2, 0, 1, 0, 1],
    // [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    // [1, 0, 2, 1, 1, 2, 1, 1, 2, 0, 1],
    // [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    // [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
    // del --> elso koord +1
    // eszak --> elso kord -1
    // kelet --> masodik kord + 1
    // nyugat --> masodik kord -1;
    if (condition) {
        
    }
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
                    if (!alerttriggered) {
                        place(cell);
                    }
                    else {
                        move(cell);
                    }
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
    console.log("elso");
    
    if (cell.querySelector(".piece")) return;

    const img = document.createElement("img");
    img.className = "piece";

    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;

    if (currentPlayer == 1) {
        img.src = "white.png";
        whiteCount++;
        document.getElementById("egy").innerText = "1. Lerakható ⚪ még: " + (9 - whiteCount);
        currentPlayer = 2;
        document.getElementById("playerText").innerText = "2. Játékos: ⚫";
        positions[row][col] = 5;
    } else {
        img.src = "black.png";
        blackCount++;
        document.getElementById("ketto").innerText = "2. Lerakható ⚫ még: " + (9 - blackCount);
        currentPlayer = 1;
        document.getElementById("playerText").innerText = "1. Játékos: ⚪";
        positions[row][col] = 7;
    }

    cell.innerHTML = "";
    cell.appendChild(img);

    if (whiteCount >= 9 && blackCount >= 9) {
        if (!alerttriggered) {
            alert("Lerakás vége, indulhat a játék!");
            alerttriggered = true;
        }
        if (alerttriggered) {
            document.getElementById("egy").innerText = "1. Hátralévő ⚪ bábuk: " + whiteCount;
            document.getElementById("ketto").innerText = "2. Hátralévő ⚫ bábuk: " + blackCount;
        }
    }
}