window.onload = () => {
    console.log("Strona załadowana!");

    let colors = [];

    // Załaduj każdy kolor
    for (i = 0; i < 256; i++) {
        let x = i % 16;
        let y = parseInt(i / 16);
        let hex = convertToHex(convertToBin(x, y), y);
        renderColor(i, hex);
        // Dodaj
        colors.push(hex);
    }

    // Dodaj event'y
    const cols = document.querySelectorAll(".color");
    cols.forEach((col) => {
        col.addEventListener("click", click);
    });
};

function renderColor(id, hex) {
    let divElement = document.createElement("div");
    divElement.classList = "color";
    divElement.setAttribute("color-id", id);
    divElement.style.backgroundColor = "#" + hex;
    document.getElementById("palette").appendChild(divElement);
}

function convertToBin(dec, y) {
    // Różowy
    if (y == 0) {
        if (dec == 0) return "FF0080";
        // 441010
        // 552020
        let rest = dec - 3;
        if (rest < 0) rest = 0;
        if (rest > 0)
            return (
                dec.toString(16) +
                dec.toString(16) +
                rest.toString(16) +
                "0" +
                rest.toString(16) +
                "0"
            );
        else return dec.toString(16) + dec.toString(16) + "0000";
    }
    // Pomarańczowy
    if (y == 1) {
        if (dec == 0) return "B803FF";
        // ff8010
        let rest = dec - 6;
        if (rest > 0) {
            let rest2 = rest - 7 < 0 ? 0 : rest - 7;
            return (
                dec.toString(16) +
                dec.toString(16) +
                rest.toString(16) +
                "0" +
                rest2.toString(16) +
                "0"
            );
        } else return dec.toString(16) + dec.toString(16) + "0000";
    }

    // Pozostałe
    let perm = [
        "110000",
        "100000",
        "100101",
        "111100",
        "101000",
        "001100",
        "001000",
        "001111",
        "001010",
        "000011",
        "000010",
        "110011",
        "100010",
        "111010",
        "111111",
        "101010",
    ];
    let bin = perm[dec];
    return bin;
}

function convertToHex(bin, num) {
    let hex = bin;
    hex = hex.replaceAll("1", num.toString(16));
    return hex;
}

function click() {
    const colorId = this.getAttribute("color-id");
    const colorDiv = document.querySelector("div[color-id='" + colorId + "']");
    document.querySelectorAll(".color").forEach((el) => {
        el.classList.remove("clicked");
    });
    colorDiv.classList.add("clicked");
    const color = colorDiv.style.backgroundColor;
    document.body.style.backgroundColor = color;
    document.getElementById("color-selected").innerText = color;
    document.getElementById("color-id").innerText = colorId;
    console.log("Wybrano kolor " + colorId + ", " + color);
}

// --------------------------------------------------------------------------

function convertToBinOld(dec) {
    let bin = String(Number(dec).toString(2));
    if (bin.length < 6) {
        let diff = 6 - bin.length;
        for (let b = 0; b < diff; b++) {
            bin = "0" + bin;
        }
    }
    return bin;
}

function getChar(num) {
    let chars = ["1", "4", "9", "F"];
    return chars[num];
}
