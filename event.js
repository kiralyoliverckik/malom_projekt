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
            let content = getCellContent(rowData[j]);
            cell.innerText = content;

            if (content == "◯") {
                cell.addEventListener("click", function() {
                    place();
                })
            }

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}

function place() {
    console.log("hawk tuah!")
}

function getCellContent(v) {
    switch (v) {
        case 0: return "◯";
        case 1: return "─";
        case 2: return "│";
        case 4: return "";
    }
}