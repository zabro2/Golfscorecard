let playerCount = 0;
let players = []

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
            <div class='yardRow'></div>
            <div class='handicapRow'></div>
            <div class='parRow'></div>`);
            $(".totalsCol").html(`<div>`)
            $('.infoSpotNamesHolder').html(`<div class='infoSpotNames' id='holeNumberName'></div>
            <div class='infoSpotNames' id='yardName'>Yards</div>
            <div class='infoSpotNames' id='handicapName'>Handicap</div>
            <div class='infoSpotNames' id='parName'>Par</div>`);

            for (let i = 0; i < data.data.holeCount; i++) {
                $(".holeNumberRow").append(`<div class='holeNumber' id='holeNumber${i}'>${i+1}</div>`);
                $(".yardRow").append(`<div class='yard' id='yard${i}'>${data.data.holes[i].teeBoxes[difficulty-1].yards}</div>`);
                $(".handicapRow").append(`<div class='handicap' id='handicap${i}'>${data.data.holes[i].teeBoxes[difficulty-1].hcp}</div>`);
                $(".parRow").append(`<div class='par' id='par${i}'>${data.data.holes[i].teeBoxes[difficulty-1].par}</div>`);

            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseVal}`, true);
    xhttp.send();
}

function checkNameKey(event) {
    switch(event.keyCode) {
        case 13:
        newPlayer();
        $("#playerNameInput").focus();
        break;
    }
}

function newPlayer() {
    let course = $("#courseSelect").val();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        let nameInput = $("#playerNameInput")
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            if (playerCount >= 4) {
                alert('Player limit has been reached');
                nameInput.val('');
            } else if (players.includes(nameInput.val())) {
                alert('That name is alredy taken');
                nameInput.val('');
            } else {
                $(".names").append(`<div class='name' id='player${playerCount}'>${nameInput.val()}</div>`);
                players.push(nameInput.val());
                $(".bRight").append(`<div class='holes' id='holes${playerCount}'></div>`);
                for (let i = 0; i < data.data.holeCount; i++) {
                    $("#holes" + playerCount).append(`<div id='holeHolder${i}' class='hole'>
                <input class='holeScore' id='hole${i}' type='number' placeholder='0'>
                </div>`);
                }
                nameInput.val('');
                playerCount++;
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${course}`, true);
    xhttp.send();
}