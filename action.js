var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        for (let i = 0; i < data.courses.length; i++) {
            $("#courseSelect").append(`<option value='${data.courses[i].id}'>${data.courses[i].name}</option>`);
        }
    }
};
xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
xhttp.send();

function updateSelectDifficulty() {
    let courseVal = $("#courseSelect").val();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            $("#difficulty").html('');
            for (let i = 0; i < data.data.holes[0].teeBoxes.length; i++) {
                $("#difficulty").append(`<option value='${data.data.holes[0].teeBoxes[i].teeTypeId}'>${data.data.holes[0].teeBoxes[i].teeType}</option>`)
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseVal}`, true);
    xhttp.send();
}

function newGame() {
    let courseVal = $("#courseSelect").val();
    let difficulty = $("#difficulty").val();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            $(".infoSpot").html(`<div class='holeNumberRow'></div>
            <div class='handicapRow'></div>
            <div class='yardRow'></div>
            <div class='parRow'></div>`);
            $('.infoSpotNamesHolder').html(`<div class='infoSpotNames' id='holeNumberName'></div>`);
            for (let i = 0; i < data.data.holeCount; i++) {
                $(".holeNumberRow").append(`<div class='holeNumber' id='holeNumber${i}'>${i+1}</div>`);
                $(".handicapRow").append(`<div class='handicap' id='handicap${i}'>${data.data.holes[i].teeBoxes[difficulty-1].hcp}</div>`);
                $(".yardRow").append(`<div class='yard' id='yard${i}'>${data.data.holes[i].teeBoxes[difficulty-1].yards}</div>`);
                $(".parRow").append(`<div class='par' id='par${i}'>${data.data.holes[i].teeBoxes[difficulty-1].par}</div>`);
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseVal}`, true);
    xhttp.send();
}

let playerCount = 0;

function newPlayer() {
    let course = $("#courseSelect").val();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            if (playerCount < 4) {
                $(".names").append(`<div class='name' id='${playerCount}' contenteditable='true'>Player</div>`);
                $(".bRight").append(`<div class='holes' id='holes${playerCount}'></div>`);
                for (let i = 0; i < data.data.holeCount; i++) {
                    $("#holes" + playerCount).append(`<div id='hole${[i]}' class='hole'>
                <div contenteditable='true'>0</div>
                </div>`);
                }
                playerCount++;
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${course}`, true);
    xhttp.send();
}