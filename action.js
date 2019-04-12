let playerCount = 0;
let players = []
var dataStuff;

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
            dataStuff = JSON.parse(xhttp.responseText);
            $(".infoSpot").html(`<div class='holeNumberRow'></div>
            <div class='yardRow'></div>
            <div class='handicapRow'></div>
            <div class='parRow'></div>`);
            $(".totalsCol").html(`<div class='totalsName'>Scores</div>
            <div class='scoreTitlesHolder'>
                <div id='outHolder' class='scoreTitles'>
                    <div class='actualTitle'>Out</div>
                    <div class='totalScoreBoxes outBoxes'></div>
                </div>
                <div id='inHolder' class='scoreTitles'>
                    <div class='actualTitle'>In</div>
                    <div class='totalScoreBoxes inBoxes'></div>
                </div>
                <div id='totalHolder' class='scoreTitles'>
                    <div class='actualTitle'>Total</div>
                    <div class='totalScoreBoxes totalBoxes'></div>
                </div>
            </div>
            <div class='scoreHolder></div>`)
            $('.infoSpotNamesHolder').html(`<div class='infoSpotNames' id='holeNumberName'></div>
            <div class='infoSpotNames' id='yardName'>Yards</div>
            <div class='infoSpotNames' id='handicapName'>Handicap</div>
            <div class='infoSpotNames' id='parName'>Par</div>`);

            for (let i = 0; i < data.data.holeCount; i++) {
                $(".holeNumberRow").append(`<div class='holeNumber' id='holeNumber${i}'>${i + 1}</div>`);
                $(".yardRow").append(`<div class='yard' id='yard${i}'>${data.data.holes[i].teeBoxes[difficulty - 1].yards}</div>`);
                $(".handicapRow").append(`<div class='handicap' id='handicap${i}'>${data.data.holes[i].teeBoxes[difficulty - 1].hcp}</div>`);
                $(".parRow").append(`<div class='par' id='par${i}'>${data.data.holes[i].teeBoxes[difficulty - 1].par}</div>`);

            }
            $(".courseName").html(`${data.data.name}`);
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseVal}`, true);
    xhttp.send();
}

function checkNameKey(event) {
    switch (event.keyCode) {
        case 13:
            newPlayer();
            $("#playerNameInput").focus();
            break;
    }
}

function newPlayer() {
    let nameInput = $("#playerNameInput")
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
        for (let i = 0; i < dataStuff.data.holeCount; i++) {
            $("#holes" + playerCount).append(`<div id='holeHolder${nameInput.val()}${i}' class='hole'>
                <input class='holeScore' id='hole${nameInput.val()}${i}' type='number' value='0' onchange='updateScores()'>
                </div>`);
        }
        $(".outBoxes").append(`<div class='box' id='${nameInput.val()}Out'></div>`);
        $(".inBoxes").append(`<div class='box' id='${nameInput.val()}In'></div>`);
        $(".totalBoxes").append(`<div class='box' id='${nameInput.val()}Total'></div>`);
        nameInput.val('');
        playerCount++;
    }
}

function updateScores() {
    for (let i = 0; i < players.length; i++) {
        x = players[i];
        let outScore = 0;
        let inScore = 0;
        let totalScore = 0;
        for (let h = 0; h < 9; h++) {
            outScore += parseFloat($("#hole" + x + h).val());
            inScore += parseFloat($("#hole" + x + (h + 9)).val());
        }
        totalScore = outScore + inScore;
        $("#" + x + "Out").html(outScore);
        $("#" + x + "In").html(inScore);
        $("#" + x + "Total").html(totalScore);
    }
}

function endGame() {
    let currentPar = dataStuff.data.par;
    console.log(currentPar);
}