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

let holesCount = 0;

function newGame() {
    let course = $("#courseSelect").val();
    let difficulty = $("#difficulty").val();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            $(".names").append(`<div class='name' contenteditable='true'>Player</div>`);
            $(".bRight").append(`<div class='holes' id='holes${holesCount}'></div>`);
            for (let i = 0; i < data.data.holeCount; i++) {
                $("#holes" + holesCount).append(`<div id='hole${[i+1]}' class='hole'>
                <div contenteditable='true'>0</div>
                </div>`);
            }
            holesCount ++;
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${course}`, true);
    xhttp.send();
}