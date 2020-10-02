(function () {
    document.getElementById("nw-se-dash-button").onchange = function () { hideImage(this); };
    document.getElementById("ns-dash-button").onchange = function () { hideImage(this); };
    document.getElementById("ne-sw-dash-button").onchange = function () { hideImage(this); };
    document.getElementById("ew-dash-button").onchange = function () { hideImage(this); };
    document.getElementById("nails-button").onchange = function () { hideImage(this); };
    document.getElementById("ifrit-arena-button").onchange = function () { hideImage(this); };

    function hideImage(element) {
        document.getElementById(element.id.slice(0, -7)).style.display = element.checked ? null : "none";
    }

    function placeNail(position) {
        var nailsContainer = document.getElementById("nails-container");
        nailsContainer.appendChild(createNailElement(position));
    }

    function getNailPosition(position) {
        switch (position) {
            case 0: return "N";
            case 1: return "NE";
            case 2: return "E";
            case 3: return "SE";
            case 4: return "S";
            case 5: return "SW";
            case 6: return "W";
            case 7: return "NW";
        }
    }

    var state = {
        frontRight: 0,
        backRight: 0,
        frontLeft: 0,
        backLeft: 0,
    };

    var positions = {
        "N": { top: 101, left: 243 },
        "NE": { top: 135, left: 335 },
        "E": { top: 242, left: 383 },
        "SE": { top: 340, left: 339 },
        "S": { top: 352, left: 243 },
        "SW": { top: 338, left: 146 },
        "W": { top: 242, left: 100 },
        "NW": { top: 135, left: 150 },
    }

    function printNailPositions() {
        console.log("New nail positions:");
        console.log(`\tFR: ${getNailPosition(state.frontRight)}`);
        console.log(`\tBR: ${getNailPosition(state.backRight)}`);
        console.log(`\tFL: ${getNailPosition(state.frontLeft)}`);
        console.log(`\tBL: ${getNailPosition(state.backLeft)}`);
    }

    function createNailElement(idx) {
        var position = getNailPosition(idx);
        var coords = positions[position];
        var nailElement = document.createElement("div");
        nailElement.id = "Nail-" + position;
        nailElement.classList.add("image-overlay");
        nailElement.classList.add("nail-marker");
        nailElement.style.background = "url(./Ifrit_Charges/NailMarker.png)";
        nailElement.style.backgroundSize = "100%";
        nailElement.style.zIndex = 10;
        nailElement.style.left = `${coords.left}px`;
        nailElement.style.top = `${coords.top}px`;
        return nailElement;
    }

    function generateMarkersFromStartingPosition(idx) {
        /*
            Front right nail first, then Back Right, then Front Left, then Back Left
        */
        state.frontRight = idx;
        state.backRight = (idx + 2) > 7 ? (idx + 2) % 4 : (idx + 2);
        state.frontLeft = idx == 0 ? 7 : idx - 1;
        state.backLeft = (state.frontLeft - 2) < 0 ? (7 + (state.frontLeft - 1)) : state.frontLeft - 2;

        document.getElementById("nails-container").innerHTML = "";

        placeNail(state.frontRight);
        placeNail(state.backRight);
        placeNail(state.frontLeft);
        placeNail(state.backLeft);
    }

    document.getElementById("placeNailsButton").onclick = function () {
        var randomPosition = Math.floor(Math.random() * 8);
        generateMarkersFromStartingPosition(randomPosition);
    }

    document.getElementById("placeAllNailsButton").onclick = function () {
        /*
        <div class="image-overlay nail-marker" id="w-nail"
            style="background: url(./Ifrit_Charges/NailMarker.png); background-size: 100%; z-index: 10; left: 125px; top: 250px;">
        </div>
        */
        var nailsContainer = document.getElementById("nails-container");
        nailsContainer.innerHTML = "";
        for (var i = 0; i < 8; i++) {
            nailsContainer.appendChild(createNailElement(i));
        }
    }
})();

