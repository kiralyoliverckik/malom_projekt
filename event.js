let cplayer;
let wcount;
let bcount;
let alert_t = false;
let positions;
let selected = false;
let active = [];

function generate() {
    positions = [
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

    alert_t = false;
    const board = document.querySelector("table");
    board.innerHTML = "";
    document.querySelector("input").value = "Reset";
    cplayer = 1;
    wcount = 0;
    bcount = 0;
    document.getElementById("ptext").innerText = "1. Játékos: ⚪";
    document.getElementById("egy").innerText = "1. Lerakható ⚪ még: " + 9;
    document.getElementById("ketto").innerText = "2. Lerakható ⚫ még: " + 9;
    active = [];

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

    if ((cplayer == 1 && positions[row][col] == 5) || (cplayer == 2 && positions[row][col] == 7)) {
        if (selected) {
            r_highlights();
        }

        highlight2(cell);
        highlight(row, col);
        selected = true;

        oldr = row;
        oldc = col;
    } 
    else if (selected && cell.classList.contains("highlight")) {
        update(oldr, oldc, cell);
        selected = false;
    }
}

function highlight2(c) {
    c.classList.add("selected");
}

function update(oldr, oldc, cell) {
    const newr = cell.parentNode.rowIndex;
    const newc = cell.cellIndex;
    const value = positions[oldr][oldc];

    positions[newr][newc] = value;
    positions[oldr][oldc] = 2;

    const old = document.querySelector("table").rows[oldr].cells[oldc];
    const spot = document.createElement("img");
    spot.src = "circle.png";
    spot.className = "circle";
    old.innerHTML = "";
    old.appendChild(spot);

    const piece = document.createElement("img");
    piece.className = "piece";
    piece.src = value == 5 ? "white.png" : "black.png";
    cell.innerHTML = "";
    cell.appendChild(piece);

    cplayer = cplayer == 1 ? 2 : 1;
    document.getElementById("ptext").innerText = cplayer == 1 ? "1. Játékos: ⚪" : "2. Játékos: ⚫";

    r_highlights();
    checkmills();
}

function checkmills() {
    const cellz = document.querySelectorAll(".mill");
    for (let i = 0; i < cellz.length; i++) {
        cellz[i].classList.remove("mill");
    }

    active = [];
    const pos = [
        [[0, 0], [5, 0], [10, 0]],
        [[0, 5], [5, 5], [10, 5]],
        [[0, 0], [0, 5], [0, 10]],
        [[0, 10], [5, 10], [10, 10]],
        [[2, 2], [2, 5], [2, 8]],
        [[4, 4], [4, 5], [4, 6]],
        [[5, 0], [5, 2], [5, 4]],
        [[5, 6], [5, 8], [5, 10]],
        [[6, 4], [6, 5], [6, 6]],
        [[8, 2], [8, 5], [8, 8]],
        [[2, 2], [5, 2], [8, 2]],
        [[2, 8], [5, 8], [8, 8]],
        [[10, 0], [10, 5], [10, 10]],
        [[4, 6], [5, 6], [6, 6]],
        [[4, 4], [5, 4], [6, 4]],
        [[0, 5], [2, 5], [4, 5]],
        [[6, 5], [8, 5], [10, 5]]
    ];

    for (let i = 0; i < pos.length; i++) {
        let mill = pos[i];
        let [a, b, c] = mill;
        let [r1, c1] = a;
        let [r2, c2] = b;
        let [r3, c3] = c;

        if (positions[r1][c1] == positions[r2][c2] && 
            positions[r2][c2] == positions[r3][c3] &&
            (positions[r1][c1] == 5 || positions[r1][c1] == 7)) {
            highlight3(mill);
            active.push(mill);
        }
    }

    for (let i = active.length - 1; i >= 0; i--) {
        let mill = active[i];
        let [a, b, c] = mill;
        let [r1, c1] = a;
        let [r2, c2] = b;
        let [r3, c3] = c;

        if (!(positions[r1][c1] == positions[r2][c2] && 
                positions[r2][c2] == positions[r3][c3])) {
            active.pop();
        }
    }
}

function highlight3(cells) {
    for (let [row, col] of cells) {
        document.querySelector("table").rows[row].cells[col].classList.add("mill");
    }
}

function r_highlights() {
    const cells = document.querySelectorAll("td");

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("highlight");
        cells[i].classList.remove("selected");
    }
}

function highlight(r, c) {
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    for (let i = 0; i < directions.length; i++) {
        let row = r;
        let col = c;
        let empty = false;

        while (true) {
            row += directions[i][0];
            col += directions[i][1];

            if (row < 0 || row >= positions.length || col < 0 || col >= positions[row].length) break;

            const cell = document.querySelector("table").rows[row].cells[col];
            const value = positions[row][col];

            if (value == 5 || value == 7) break;

            if (value == 0) break;

            if (value == 2 && !empty) {
                cell.classList.add("highlight");
                empty = true; 
            }

            if (value == 2 && empty) {
                break;
            }
        }
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
                    if (!alert_t) {
                        place(cell);
                        checkmills()
                    }
                    else if (wcount >= 2 || bcount >= 2) {
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
    if (cell.querySelector(".piece")) return;

    const img = document.createElement("img");
    img.className = "piece";

    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;

    if (cplayer == 1) {
        img.src = "white.png";
        wcount++;
        document.getElementById("egy").innerText = "1. Lerakható ⚪ még: " + (9 - wcount);
        cplayer = 2;
        document.getElementById("ptext").innerText = "2. Játékos: ⚫";
        positions[row][col] = 5;
    } else {
        img.src = "black.png";
        bcount++;
        document.getElementById("ketto").innerText = "2. Lerakható ⚫ még: " + (9 - bcount);
        cplayer = 1;
        document.getElementById("ptext").innerText = "1. Játékos: ⚪";
        positions[row][col] = 7;
    }

    cell.innerHTML = "";
    cell.appendChild(img);

    if (wcount >= 9 && bcount >= 9) {
        if (!alert_t) {
            alert("Lerakás vége, indulhat a játék!");
            alert_t = true;
        }
        if (alert_t) {
            document.getElementById("egy").innerText = "1. Hátralévő ⚪ bábuk: " + wcount;
            document.getElementById("ketto").innerText = "2. Hátralévő ⚫ bábuk: " + bcount;
        }
    }
}