const jatekter = document.getElementById("jatekter");
const jatekosInfo = document.getElementById("jatekosInfo");

let jatekos = 1; // 1: Játékos 1 (O), 2: Játékos 2 (X)
let lepesek = 0; // Lépések száma

function letrehozTablat() {
    const tabla = document.createElement("table");

    // 9 sor és 9 oszlop
    for (let i = 0; i < 9; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const td = document.createElement("td");

            // Csak a megfelelő helyeken legyenek kattintható cellák
            if (
                (i % 4 === 0 && j % 4 === 0) || // A négyzetek sarkai
                (i === 2 && j === 4) ||         // Középső sor vízszintes összekötő
                (i === 4 && (j === 2 || j === 6)) // Középső oszlop függőleges összekötő
            ) {
                td.innerText = ""; // Üres cella
                td.onclick = function () { jatekosLepes(this); };
            } else {
                td.innerText = ""; // Üres, nem kattintható cella
                td.style.backgroundColor = "#f0f0f0"; // Szürke háttérszín az üres celláknak
            }

            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }

    jatekter.innerHTML = ""; // Tábla törlése, ha már létezik
    jatekter.appendChild(tabla);
    jatekosInfo.innerText = "Játékos 1 (O) következik"; // Kezdő játékos beállítása
    lepesek = 0; // Lépések száma visszaállítása
}

function jatekosLepes(cella) {
    if (cella.innerText === "") {
        if (jatekos === 1) {
            cella.innerText = "O"; // Játékos 1 jele
            jatekos = 2; // Következő játékos
            jatekosInfo.innerText = "Játékos 2 (X) következik";
        } else {
            cella.innerText = "X"; // Játékos 2 jele
            jatekos = 1; // Következő játékos
            jatekosInfo.innerText = "Játékos 1 (O) következik";
        }
        lepesek++;
        ellenorizNyertes();
    }
}

function ellenorizNyertes() {
    const cellak = document.querySelectorAll("td");
    const kombinaciok = [
        // Függőleges malmok
        [0, 36, 72], [4, 40, 76], [8, 44, 80],
        // Vízszintes malmok
        [0, 4, 8], [36, 40, 44], [72, 76, 80],
        // Átlós malmok
        [0, 40, 80], [8, 40, 72]
    ];

    for (const kombinacio of kombinaciok) {
        const [a, b, c] = kombinacio;
        if (
            cellak[a].innerText !== "" &&
            cellak[a].innerText === cellak[b].innerText &&
            cellak[a].innerText === cellak[c].innerText
        ) {
            alert(`Játékos ${cellak[a].innerText === "O" ? "1" : "2"} nyert!`);
            ujJatek();
            return;
        }
    }

    // Döntetlen ellenőrzése
    const uresCellak = Array.from(cellak).filter(cella => cella.innerText === "").length;
    if (uresCellak === 0) {
        alert("Döntetlen!");
        ujJatek();
    }
}

function ujJatek() {
    jatekter.innerHTML = "";
    letrehozTablat();
}
